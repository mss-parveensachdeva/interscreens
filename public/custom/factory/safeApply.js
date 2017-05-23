(function (app, undefined) {
  'use strict';
  app
    .factory('safeApply', factoryMethod);
  
  factoryMethod.$inject = [];
  
  function factoryMethod() {
    return function ($scope, fn) {
      if($scope.$root !== undefined){
          var phase = $scope.$root.$$phase;
          if (phase == '$apply' || phase == '$digest') {
            if (fn) {
              $scope.$eval(fn);
            }
          } else {
            if (fn) {
              $scope.$apply(fn);
            } else {
              $scope.$apply();
            }
          }  
      }
    };
  }
})(app);