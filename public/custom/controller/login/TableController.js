(function(app, undefined){
	app
	.controller('TableController', TableControllerMethod);
	
	TableControllerMethod.$inject = ['$state', 'LocalStorage', '$http', 'ngToast'];
	
	function TableControllerMethod($state, LocalStorage, $http, ngToast){
		var vm = this;
			vm.selected_db = LocalStorage.getData("db_connection") ? LocalStorage.getData("db_connection") : "default";
			
		vm.logout = function(){
			LocalStorage.clearAll();
			$state.go('login');
		};
		
		vm.selectedDB = function(db){
			$http
			.get('/api/db_connection/'+ db)
			.then(function(res_data){
				LocalStorage.setData("db_connection", db);
				ngToast.info({
					content: "Database selected successfully!"	
				});
				console.info(res_data.status);
			}, function(err){
				console.log("err >>", err);
			});
		};
	}
})(app);