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
			}
		};
	}
	
})(app);