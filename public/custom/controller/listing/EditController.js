(function(app, undefined){
	app.controller('EditListingController', EditListingControllerMethod);
	
	EditListingControllerMethod.$inject = ['$scope', 'EDIT_FORM_SCHEMA', '$state', 'loaderService', '$http', 'ngToast', 'LocalStorage', 'edit_data'];
	
	function EditListingControllerMethod($scope, EDIT_FORM_SCHEMA, $state, loaderService, $http, ngToast, LocalStorage, edit_data){
		var vm = this ;
		vm.timeout_count = [] ;
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

				case 'details':
					vm.schema = EDIT_FORM_SCHEMA.DetailSchema();
					break;

				case 'task_table':
					vm.schema = EDIT_FORM_SCHEMA.TaskTableSchema(doc);
					break;

				case 'timeout':
					vm.schema = EDIT_FORM_SCHEMA.TimeoutSchema();
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
	}
})(app);