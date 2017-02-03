angular.module('WordsCtrl', [])
.controller('WordsController', function($scope, Words) {

  $scope.words = [];

	$scope.search = function (text) {
		Words.search(text)
				.then(function (data) {
					$scope.words = data;
				});
	}


});;