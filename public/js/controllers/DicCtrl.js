angular.module('DicCtrl', [])
.controller('DicController', function($scope, Dic) {

  $scope.file = '';	
  $scope.count = 0;
  $scope.busy = false;

  $scope.upload = function(filename) {
  	$scope.busy = true;
		Dic.upload(filename)
			.then(function (data) {
				$scope.busy = false;
				$scope.count = data;
			});
	};

});