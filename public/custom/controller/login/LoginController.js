(function(app, undefined){
	app.controller('LoginController', LoginControllerMethod);
	
	LoginControllerMethod.$inject = ['$state', '$http', 'loaderService', 'LocalStorage', '$timeout'];
	
	function LoginControllerMethod($state, $http, loaderService, LocalStorage, $timeout){
		var token = LocalStorage.getData('token');
		if(token) $state.go('tables');
		
		var vm =this;
		vm.credentails = {};
		vm.logger = {isShowMsg : false, logger_class: "", logger_msg: "", logger_time: 3000};

		vm.loginForm = function(data){
			vm.logger.logger_time = 3000 ;
			if(Object.keys(data).length){
				loaderService.show();
				$http
				.post('/api/login', data)
				.then(function(response){
					loaderService.hide();
					//console.log("response >>", response);
					if(response.data.length){
						LocalStorage.setData('token', response.data[0].fields.access_token);
						loaderService.hide();
						$state.go('tables');
						return false ;
					}else{
						vm.logger.isShowMsg		= true ;
						vm.logger.logger_class 	= "alert alert-danger";
						vm.logger.logger_msg	= "Phone number doesn't exists.";
						$timeout(function(){
							vm.logger = { isShowMsg : false, logger_class: "", logger_msg: "", };
						}, vm.logger.logger_time);
						return false ;
					}
				}, function(err){
					loaderService.hide();
					console.log("err >>", err);
					return false ;
				});
				return false ;
			}else{
				vm.logger.isShowMsg		= true ;
				vm.logger.logger_class 	= "alert alert-danger";
				vm.logger.logger_msg	= "Please fill number to go next.";
				$timeout(function(){
					vm.logger = { isShowMsg : false, logger_class: "", logger_msg: "", };
				}, vm.logger.logger_time);
				return false ;
			}
		};	
	}
	
})(app);

