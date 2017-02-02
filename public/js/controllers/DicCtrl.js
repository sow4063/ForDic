angular.module('DicCtrl', [])
.controller('DicController', function($scope, Dic) {

  console.log('DicController');
  $scope.file = '';	

  $scope.upload = Dic.upload;

});