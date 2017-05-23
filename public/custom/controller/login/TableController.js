(function(app, undefined){
	app
	.controller('TableController', TableControllerMethod);
	
	TableControllerMethod.$inject = ['$state', 'LocalStorage'];
	
	function TableControllerMethod($state, LocalStorage){
		var vm = this;
		
		vm.logout = function(){
			LocalStorage.clearAll();
			$state.go('login');
		};
	}
})(app);