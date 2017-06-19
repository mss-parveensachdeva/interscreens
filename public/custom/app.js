var app = angular.module('listingAppModule', ['ui.router', 'schemaForm', 'ngToast']);
	
	app.constant('APIROOT', 'https://platform.mybluemix.net');
	app.filter('startFrom', function() {
		return function(input, start) {
			if(input){
				start = +start; //parse to int
				return input.slice(start);
			}
		};
	});
	
	app.config(function($stateProvider, $urlRouterProvider, ngToastProvider, schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
		$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'partials/templates/login-tmpl.html',
			controller: 'LoginController',
			controllerAs: 'login',
			resolve: {}
		})
		.state('tables', {
			url: '/tables',
			templateUrl: 'partials/templates/table-tmpl.html',
			controller: 'TableController',
			controllerAs: 'tables',
			resolve: {}	
		})
		.state('listing', {
			url: '/listing',
			params: {
				table_name: null,
				data : {
					array : true 
				},
				hiddenParam: true
			},
			templateUrl: 'partials/listing/listing.html',
			controller: 'listingController',
			controllerAs: 'LC',
			resolve: {}
		})
		.state('edit_record', {
			url: '/listing/edit',
			params: { 
				detail : { 
				  array : true,
				},
				hiddenParam: 'YES',
			},
			templateUrl: 'partials/listing/edit.html',
			controller: 'EditListingController',
			controllerAs: 'EC',
			resolve: {
				edit_data : ['$stateParams', 'LocalStorage', '$http', function($stateParams, LocalStorage, $http){
					if($stateParams.detail){
						LocalStorage.setData('incoming_parameters', { from_id: $stateParams.detail[0]._id, from_table: $stateParams.detail[0].table, from_field: null, to_table: null, to_id: null, isSelected: false});
						return $stateParams.detail[0] ;
					}else{
						var obj = LocalStorage.getData('incoming_parameters');
						return $http
						.get('/api/record_by_id/'+ obj.from_table + '/' + obj.from_id)
						.then(function(record){
							if(record.data.data === null){
								return {} ;
							}else{
								return record.data[0] ;
							}
						}, function(error){
							console.log("record >>", error);
							return {} ;
						});
					}
				}]
			}
		})
		.state('show_record', {
			url: '/show/record',
			params: { 
				data : {
					array: true 	
				},
				hiddenParam: 'YES',
			},
			templateUrl: 'partials/listing/show_record.html',
			controller: 'listRecordController',
			controllerAs: 'record',
			resolve: {
				data: ["$stateParams", "$http", "ngToast", function($stateParams, $http, ngToast){
					if($stateParams.data){
						var table_name  = $stateParams.data[0].to_table ,
							id			= $stateParams.data[0].to_id ;
						return $http
							.get('/api/record_by_id/'+ table_name + '/' + id)
							.then(function(record){
								if(record.data.data === null){
									ngToast.info({
										content: "No Record found."	
									});
									return {} ;
								}else{
									return  record.data[0] ;
								}
							}, function(error){
								console.log("record >>", error);
								return {};
							});
					}else{
						return {} ;
					}
				}]
			}
		})
		.state('list_record', {
			url: '/list/record'	,
			params: { 
				data : {
					array: true 	
				},
				hiddenParam: 'YES',
			},
			templateUrl: 'partials/listing/list_record.html',
			controller: 'ListRecordController',
			controllerAs: "LRC",
			resolve: {
				list_record: ['$stateParams', 'loaderService', '$http',function($stateParams, loaderService, $http){
					loaderService.show();
					if($stateParams.data){
						var table_name  = $stateParams.data[0].to_table ;
						return $http
							.get('/api/get_list/' + table_name)
							.then(function(list){
								loaderService.hide();
								return list.data;
							}, function(err){
								loaderService.hide();
								console.log("err >>>", err);
								return {};
							});
						
					}else{
						loaderService.hide();
						return {};
					}
				}]
			}
		})
		.state('add_record', {
			url: '/listing/add',
			templateUrl: 'partials/listing/add.html',
			controller: 'AddRecordController',
			controllerAs: 'AR',
			resolve: {}
		})
		.state('testMediaUpload', {
			url: '/media',
			templateUrl: 'partials/media/media.html',
			controller: 'MediaController',
			controllerAs: 'MC',
			resolve: {}
		})
		.state('404', {
			templateUrl: 'partials/error/error-page-tmpl.html',
			controller: 'ErrorPageController',
			controllerAs: 'error',
			resolve: {
				code: function () {
					return 404;
				}
			}
		})
		.state('500', {
			templateUrl: 'partials/error/error-page-tmpl.html',
			controller: 'ErrorPageController',
			controllerAs: 'error',
			resolve: {
				code: function () {
					return 500;
				}
			}
		});

		$urlRouterProvider
		.when('', '/login')
		.when('/', '/login')
		.otherwise(function ($injector) {
			$injector.get('$state').go('404');
		});
		
		ngToastProvider.configure({
			animation: 'fade' // or 'fade'
		});
		
		/**
		 *	This decorator is used to add 2 button into
		 *	angular-schema-from respactively i.e
		 *	Record and List which is formaly used in edit-from
		 *	functionality
		 **/
		var editfield = function (name, schema, options) {
			if (schema.type === 'string' && schema.format == 'editfield') {
				// Initiate a form provider
				var f = schemaFormProvider.stdFormObj(name, schema, options);
	  
				f.key = options.path;
				f.type = 'editfield';
				// Add it to the lookup dict (for internal use)
				options.lookup[sfPathProvider.stringify(options.path)] = f;
				return f;
			}
		};
		// Add our default to the defaults array
		schemaFormProvider.defaults.string.unshift(editfield);
	  
		// Second, we want it to show if someone have explicitly set the form type
		schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'editfield','directives/decorators/bootstrap/myform/editform-tmpl.html');
		
		/**
		 *	This decorator is used to add only single button
		 *	while adding the record button is List
		 *	which is used instead of the pulldown(drop-down)
		 **/
		var addfield = function (name, schema, options) {
			if (schema.type === 'string' && schema.format == 'addfield') {
				// Initiate a form provider
				var f = schemaFormProvider.stdFormObj(name, schema, options);
	  
				f.key = options.path;
				f.type = 'addfield';
				// Add it to the lookup dict (for internal use)
				options.lookup[sfPathProvider.stringify(options.path)] = f;
				return f;
			}
		};
		// Add our default to the defaults array
		schemaFormProvider.defaults.string.unshift(addfield);
	  
		// Second, we want it to show if someone have explicitly set the form type
		schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'addfield','directives/decorators/bootstrap/myform/addform-tmpl.html');
	}).run(function($rootScope, $templateCache, $templateRequest){
		$templateRequest('decorator_tmpl/edit_template.html').then(function(template){
			$templateCache.put("directives/decorators/bootstrap/myform/editform-tmpl.html", template);
		});
		
		$templateRequest('decorator_tmpl/add_template.html').then(function(template){
			$templateCache.put("directives/decorators/bootstrap/myform/addform-tmpl.html", template);
		});
		$rootScope.loaderIsDisplay = false ;
	});
