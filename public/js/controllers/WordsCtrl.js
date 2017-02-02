angular.module('WordsCtrl', []).controller('WordsController', function($scope, Words) {

	$scope.search = Words.search;

});