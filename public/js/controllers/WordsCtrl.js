angular.module('WordsCtrl', [])
.controller('WordsController', function($scope, Words) {

  $scope.busy = false;
  $scope.words = [];
  $scope.where = 'korean';

	$scope.search = function (text) {
		$scope.busy = true;

		Words.search(text, $scope.where)
			.then(function (data) {
				$scope.busy = false;
				$scope.words = data;
			});
	};

	$scope.setWhere = function (value) {
    $scope.where = value;
  }

});