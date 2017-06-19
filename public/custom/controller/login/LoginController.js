(function(app, undefined){
	app.controller('LoginController', LoginControllerMethod);
	
	LoginControllerMethod.$inject = ['$state', '$http', 'loaderService', 'LocalStorage', '$timeout'];
	
	function LoginControllerMethod($state, $http, loaderService, LocalStorage, $timeout){
		var token = LocalStorage.getData('token');
		if(token) $state.go('tables');
		
		var vm =this;
		vm.credentails = {
			country_code: "1",
			phone:  ""
		};
		vm.logger = {isShowMsg : false, logger_class: "", logger_msg: "", logger_time: 3000};

		vm.loginForm = function(data){
			vm.logger.logger_time = 3000 ;
			if(Object.keys(data).length){
				var number = data.phone ,
				country_code = data.country_code;

				number = number.replace(/[- )(]/g,'').trim();
				var reg = new RegExp('^(0|[1-9][0-9]*)$');
				
				if(!reg.test(number)){
					vm.logger.isShowMsg		= true ;
					vm.logger.logger_class 	= "alert alert-danger";
					vm.logger.logger_msg	= "Please enter a valid number.";
					$timeout(function(){
						vm.logger = { isShowMsg : false, logger_class: "", logger_msg: "", };
					}, vm.logger.logger_time);
					return false ;
				}
				number = country_code + number ;
				console.log(number);
	
				loaderService.show();
				$http
				.post('/api/login', {phone: number})
				.then(function(response){
					loaderService.hide();
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
		
		vm.checkNumber = function(){
			if (vm.credentails !== undefined && vm.credentails.phone !== "") {
				var charLength = ('' + vm.credentails.phone).length;
				if (charLength == 9) {
					if (phone1 === '') {
						phone1 = vm.credentails.phone.toString();
						vm.credentails.phone = vm.credentails.phone.toString();
					} else {
						vm.credentails.phone = phone1;
						phone1 = '';
					}
				} else if (charLength == 10) {
					var phone = vm.credentails.phone.toString();
					formatted = '(' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
					vm.credentails.phone = formatted;
				} else {
					if (charLength < 9) {
						phone1 = '';
					}
					var phone2 = vm.credentails.phone.toString();
					vm.credentails.phone = phone2;
				}
			}
		};
		
		vm.reset = function(){
			vm.credentails = { country_code: "1", phone:  ""};
		};
	}
	
})(app);

