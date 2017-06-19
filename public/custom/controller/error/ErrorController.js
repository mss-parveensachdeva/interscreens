(function(app, undefined){
	'use strict';
	app.controller('ErrorPageController', function(code){
		var vm = this;
		vm.code = code;
	});

})(app);