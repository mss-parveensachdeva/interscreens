(function(app, undefined){
	app.controller('listRecordController', listRecordControllerMethod);
	
	listRecordControllerMethod.$inject = ['$stateParams', '$state', 'LocalStorage', 'RECORD_LIST_SCHEMA', 'data'];
	
	function listRecordControllerMethod($stateParams, $state, LocalStorage, RECORD_LIST_SCHEMA, data){
		var vm = this ;
		vm.timeout_count = [] ;
		vm.form = ["*",{type: "submit", title: "Save", readonly: true}];
		
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
				return obj.timeout_list[0];
			}else{
				return {} ;
			}
		};
		
		vm.populateSchema = function(table){
			switch(table) {
				case 'users':
					vm.schema = RECORD_LIST_SCHEMA.UserSchema();
					break;
			
				case 'template':
					vm.schema = RECORD_LIST_SCHEMA.TemplateSchema();
					break;

				case 'task_table':
					vm.schema = RECORD_LIST_SCHEMA.TaskTableSchema();
					break;

				case 'timeout':
					vm.schema = RECORD_LIST_SCHEMA.TimeoutSchema();
					break;

				case 'location':
					vm.schema = RECORD_LIST_SCHEMA.LocationSchema();
					break;
				
				default:
					console.log('Unspecified case...');
					return false ;
			}
		};


		if(Object.keys(data).length){
			vm.model = vm.setDataDynamic(data);
			vm.timeout_content = vm.setContent(data);
			vm.selectedValue = 0 ;
			vm.schema = vm.populateSchema(data.table);
			console.log("vm.schema", vm.schema, vm.populateSchema(data.table));
		}
		
		if($stateParams.data){
			LocalStorage.setData('incoming_parameters', { from_id: $stateParams.data[0].from_id, from_table: $stateParams.data[0].from_table, to_table:$stateParams.data[0].to_table, to_id:$stateParams.data[0].to_id, isSelected: false});
			vm.table_name = $stateParams.data[0].to_table ;
			vm.id = $stateParams.data[0].to_id ;
		}else{
			vm.table_name = LocalStorage.getData('table_name');
			$state.go("listing", {table_name: vm.table_name});
		}
		
		vm.selectTimeoutObj = function(value){
			vm.timeout_content = vm.model.timeout_list[value];
		};
	}
})(app);