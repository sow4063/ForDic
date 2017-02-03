angular.module('WordsCtrl', [])
.controller('WordsController', function($scope, Words) {

  $scope.words = [];
  $scope.where = 'korean';

	$scope.search = function (text) {
		Words.search(text, $scope.where)
			.then(function (data) {
				$scope.words = data;
			});
	};

	$scope.setWhere = function (value) {
    $scope.where = value;
  }

});