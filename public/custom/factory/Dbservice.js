(function(app, undefined){
	app.factory('DB_SERVICE', DB_SERVICE_METHOD);
	
	DB_SERVICE_METHOD.$inject = ['LocalStorage'];
	
	function DB_SERVICE_METHOD(LocalStorage){
		return {
			get: function(){
				var db = LocalStorage.getData('db_connection');
				switch(db){
					case 'dev':
						return "Development";
					
					case 'live':
						return "Live";
					
					case 'test':
						return "Test";
					
					default:
						return 'Default';
				}
			},
			unSafeGet: function(){
				return LocalStorage.getData('db_connection');
			},
			codeEscape: function(res){
				res = res.replace(/\\/g , "\\\\");
				res = res.replace(/"/g , '\\"');
				res = res.replace(/\t/g , "\\t");
				res = res.replace(/\v/g , "\\v");
				res = res.replace(/\n\r/g , "\\n\\r");
				res = res.replace(/\n/g , "\\n");
				res = res.replace(/\r/g , "\\r");
				return res;
			}
		};
	}
	
})(app);