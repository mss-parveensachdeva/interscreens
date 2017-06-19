(function(angular, app, undefined){
	app
	.controller('MediaController', angular.noop)
	.directive('fileUpload', fileUploadDirectiveMethod);
	
	fileUploadDirectiveMethod.$inject = ['$http'] ;
	function fileUploadDirectiveMethod($http){
		return {
			require: "?ngModel",
			restrict: 'A',
			scope: {
				uploadType: '@?'
			},
			link: function postLink(scope, el, attr, ngModel) {
				el.bind('change', function(event) {
					var file = event.target.files[0] ,
						formData = new FormData();
						formData.append('upload', file, file.name) ;
					
					$http
					.post('/api/mediaServer/upload',formData, { headers: { 'Content-Type': undefined }, transformRequest: angular.identity })
					.then(function(response){
						console.log("response>>>>>", response);
						//$timeout(function(){
							//safeApply(scope, function() {
								ngModel.$setViewValue("we_need_to_set_path_from_here");
							//});
							//document.getElementById('loader').style.display = "none";
						//},1500);
					}, function(error){
						console.log("Got Server Error", error);
					});
				});
			}
		};
	}
})(angular, app);