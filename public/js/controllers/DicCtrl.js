angular.module('DicCtrl', [])
.controller('DicController', function($scope, Dic) {

  $scope.file = '';	
  $scope.count = 0;

  $scope.upload = function(filename) {
		Dic.upload(filename)
			.then(function (data) {
				$scope.count = data;
			});
	};

});