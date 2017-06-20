(function(app, undefined){
	app
	.controller('EditListingController', EditListingControllerMethod);
	
	EditListingControllerMethod.$inject = ['$scope', 'EDIT_FORM_SCHEMA', '$state', 'loaderService', '$http', 'ngToast', 'LocalStorage', 'edit_data', '$sce', 'DB_SERVICE', 'loaderService'];
	
	function EditListingControllerMethod($scope, EDIT_FORM_SCHEMA, $state, loaderService, $http, ngToast, LocalStorage, edit_data, $sce, DB_SERVICE, loaderService){
		var vm = this ;
		vm.timeout_count = [] ;
		vm.selected_db_copy = "" ;
		vm.selected_database = DB_SERVICE.get();
		vm.form = ["*",{type: "submit",title: "Save"}];
		
		vm.setDataDynamic = function(obj){
			if(obj.table === "timeout"){
				var length = Object.keys(obj.timeout_list).length;
				if(length){
					for(var i=0; i < length; i++){
						vm.timeout_count.push(i);
					}
					return obj ;
				}
			}else{
				if(obj.phone){
					if(typeof obj.phone === "string"){
						obj.phone = parseInt(obj.phone);
					}
				}
				
				return obj;
			}
		};
		
		vm.setContent = function(obj){
			if(obj.table == "timeout"){
				return vm.edit_detail.timeout_list[0];
			}else{
				return {} ;
			}
		};

		vm.setModelDynamic = function(obj){
			var local_data = LocalStorage.getData('incoming_parameters');
			if(local_data){
				if(local_data.isSelected){
					obj[local_data.from_field] = local_data.to_id ;
					if(obj.table == "timeout"){
						var d = obj.timeout_list[vm.selectedValue] ;
						d[local_data.from_field] = local_data.to_id ;
					}
					return obj ;
				}else{
					return obj ;
				}
			}else{
				return obj;
			}
		};
		
		//User from sechema start from here....
		vm.calculateSchema = function (doc){
			switch(doc.table) {
				case 'users':
					vm.schema = EDIT_FORM_SCHEMA.UserSchema();
					break;
			
				case 'template':
					vm.schema = EDIT_FORM_SCHEMA.TemplateSchema();
					break;

				case 'task_table':
					vm.schema = EDIT_FORM_SCHEMA.TaskTableSchema(doc);
					break;

				case 'location':
					vm.schema = EDIT_FORM_SCHEMA.LocationSchema();
					break;
				
				default:
					console.log('Unspecified case...');
					return false ;
			}
		};
		
		vm.edit_detail = vm.setDataDynamic(edit_data) ;
		vm.timeout_content = vm.setContent(vm.edit_detail);
		vm.selectedValue = 0 ;
		vm.model = vm.setModelDynamic(edit_data);
		vm.schema = vm.calculateSchema(edit_data);
		console.log("vm.schema , ", vm.schema, vm.calculateSchema(vm.edit_detail));
		
		vm.obsubmit = function(form) {
			$scope.$broadcast('schemaFormValidate');
			$http
			.put('/api/update', form)
			.then(function(response){
				if(response.data.ok){
					ngToast.info({
						content: "Document updated successfully"	
					});
				}else{
					ngToast.warning({
						content: "Error while updating record. Please try again."	
					});
				}
			}, function(error){
				console.log("Error >>", error);	
			});
		};
		
		vm.selectTimeoutObj = function(value){
			vm.timeout_content = vm.edit_detail.timeout_list[value];
		};
		
		vm.setHtmlContent = function(data){
			vm.model.html = $sce.trustAsHtml(data);
		};
		
		vm.setJsContent = function(data){
			vm.model.js = $sce.trustAsHtml(data);
		};
		
		vm.setHtmlContent(vm.model.html);
		vm.setJsContent(vm.model.js);
		
		vm.CopyRecord = function(record, db){
			loaderService.show();
			var output = angular.copy(record);
			var selected_db = DB_SERVICE.unSafeGet();
			
			if(db === selected_db){
				ngToast.warning({
					content: "Sorry!!! Can not copy to same database."	
				});
				return false ;
			}
			
			if(output.table === "template") {
				output.html = DB_SERVICE.codeEscape(output.html.toString());
				output.js   = DB_SERVICE.codeEscape(output.js.toString());
			}

			$http
			.post('/api/copy_record', {selected_db: db, obj: output})
			.then(function(response){
				loaderService.hide();
				if(response.data){
					if(response.data.status === 201){
						if(response.data.data){
							var d = response.data.data.data;
							for(var i=0; i<d.length; i++){
								if(d[i].isSaved){
									ngToast.info({
										content: d[i].reason	
									});
								}else{
									ngToast.warning({
										content: d[i].reason	
									});
								}
							}
						}
					}else{
						ngToast.warning({
							content: "Some error occured while coping to target_db. Please try again after sometime Thanks !!!"	
						});
					}
				}
			}, function(error){
				console.warning(error);
				ngToast.warning({
					content: "Some error occured while coping to target_db. Please try again after sometime Thanks !!!"	
				});
			});
		};
	}
})(app);