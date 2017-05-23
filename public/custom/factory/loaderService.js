(function(){
	app.factory('loaderService', loadServiceMethod);
	
	loadServiceMethod.$inject = ['$rootScope'];
	
	function loadServiceMethod($rootScope){
		return {
			show: function(){
				$rootScope.loaderIsDisplay = true ;
			},
			hide: function(){
				$rootScope.loaderIsDisplay = false ;
			}
		};
	}
})();

