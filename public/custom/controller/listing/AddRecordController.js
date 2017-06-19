(function(app, undefined){
	app
	.controller('AddRecordController', AddRecordControllerMethod);
	
	AddRecordControllerMethod.$inject = ['ADD_FORM_SCHEMA', '$scope'];
	
	function AddRecordControllerMethod(ADD_FORM_SCHEMA, $scope){
		var vm = this ;
		$scope.selectTable = "users" ;
		vm.schema = ADD_FORM_SCHEMA.UserSchema(); 

		//User from sechema start from here....
		$scope.calculateSchema = function(type){
			switch(type) {
				case 'users':
					vm.schema = ADD_FORM_SCHEMA.UserSchema();
					break;
			
				case 'template':
					vm.schema = ADD_FORM_SCHEMA.TemplateSchema();
					break;

				case 'details':
					vm.schema = ADD_FORM_SCHEMA.DetailSchema();
					break;

				case 'task_table':
					vm.schema = ADD_FORM_SCHEMA.TaskTableSchema();
					break;

				case 'timeout':
					vm.schema = ADD_FORM_SCHEMA.TimeoutSchema();
					break;

				case 'location':
					vm.schema = ADD_FORM_SCHEMA.LocationSchema();
					break;
				
				default:
					console.log('Unspecified case...');
					return false ;
			}
		};
		
		
		vm.model = {} ;
		vm.form = ["*",{type: "submit",title: "Save"}];
		vm.obsubmit = function(form) {
			// First we broadcast an event so all fields validate themselves
			$scope.$broadcast('schemaFormValidate');
		
			// Then we check if the form is valid
			//if (form.$valid) {
			//  // ... do whatever you need to do with your data.
			//}
			
			console.log("form >>>", form);
		};
		
		$scope.$watch('selectTable', function(n,o){
			if(n !== o){
				$scope.calculateSchema(n);
			}
		});
	}
})(app);

