(function(app, undefined){
	app
	.controller('listingController', listingControllerMethod)
	.directive('showName', showNameDirectiveMethod);
	
	listingControllerMethod.$inject = ['$http','loaderService','$state', 'LocalStorage', '$stateParams'];
	showNameDirectiveMethod.$inject = [];
	
	function listingControllerMethod($http, loaderService, $state, LocalStorage, $stateParams){
		if(!LocalStorage.getData('token')) {
			$state.go('login');
			return false ;
		}
		
		var vm = this ;
			vm.currentPage = 0;
			vm.pageSize = 5;

			vm.get_list = function(){
				if($stateParams.table_name){
					LocalStorage.setData('table_name', $stateParams.table_name);
					loaderService.show();
					$http
					.get('/api/get_list/' + $stateParams.table_name)
					.then(function(list){
						vm.master_table = list.data ;
						loaderService.hide();
					}, function(err){
						console.log("err >>", err);
						loaderService.hide();
					});
				}else{
					loaderService.show();
					var table_name = $stateParams.data ? $stateParams.data[0].table : LocalStorage.getData('table_name') ;
					$http
					.get('/api/get_list/' + table_name)
					.then(function(list){
						vm.master_table = list.data ;
						loaderService.hide();
					}, function(err){
						console.log("err >>", err);
						loaderService.hide();
					});
				}
			};
			
			vm.numberOfPages = function () {
				if(vm.master_table){
					return Math.ceil(vm.master_table.length / vm.pageSize);
				}
			};
	
			vm.removeSelctedRecord = function (ids) {
				console.log("selectde ids are ", ids);
			};
			
			vm.logout = function(){
				LocalStorage.clearAll();
				$state.go('login');
			};
	}
	
	function showNameDirectiveMethod(){
		return {
			restrict: 'AE',
			scope: {
				data: "=data"
			},
			replace: true,
			template: '<label ng-bind="renderName"></label>',
			link: function(scope){
				switch(scope.data.table){
					case "template" :
						scope.renderName = scope.data.name || 'N/A';
						break;
					case "details" :
						scope.renderName = scope.data.user_incoming.message || 'N/A' ;
						break;
					case "task_table" :
						scope.renderName = scope.data.task_name || 'N/A' ;
						break;
					case "user_task" :
						scope.renderName = scope.data.userId || 'N/A' ;
						break;
					case "users" :
						scope.renderName = scope.data.virtual_phone || 'N/A' ;
						break;
					case "timeout" :
						scope.renderName = scope.data.name || 'N/A';
						break;
					case "location" :
						scope.renderName = scope.data.location_name || 'N/A' ;
						break;
					default:
						scope.renderName = "N/A";
						break;
				}
			}
		};
	}
})(app);