angular.module('DicCtrl', [])
.controller('DicController', function($scope, Dic) {

  $scope.file = '';	

  $scope.upload = Dic.upload;

});