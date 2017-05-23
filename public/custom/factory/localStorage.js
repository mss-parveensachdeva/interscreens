(function(app, undefined){
	'use strict';
	
	app.factory("LocalStorage", function($window) {
		return {
			setData: function(key, val) {
				if($window.localStorage){
					if(Object.prototype.toString.call( val ) === '[object Object]'){
						$window.localStorage.removeItem[key];
						$window.localStorage.setItem(key, JSON.stringify(val));
						return true;
					}else if(Object.prototype.toString.call( val ) === '[object Array]'){
						$window.localStorage.removeItem[key];
						$window.localStorage.setItem(key, JSON.stringify(val));
						return true;
					}else{
						$window.localStorage.removeItem[key];
						$window.localStorage.setItem(key, val);
						return true;
					}
				}else{
					alert("Please update your browser to use the functionality");
					return false;
				}
			},
			getData: function(key) {
				if($window.localStorage){
					try{
						return JSON.parse($window.localStorage.getItem(key));
					}catch(e){
						return $window.localStorage.getItem(key);
					}
				}else{
					alert("Please update your browser to use the functionality");
					return false ;
				}
			},
			clearAll: function() {
				if($window.localStorage){
					$window.localStorage.clear();
					return true ;
				}else{
					alert("Please update your browser to use the functionality");
					return false ;
				}
			}
		};
	});		
})(app);