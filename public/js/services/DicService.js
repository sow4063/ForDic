angular.module('DicService', [])
.factory('Dic', function($http) {

  var upload = function(text){
  	return $http({
      method: 'POST',
      url: '/file',
      data: { fileName: text }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    upload: upload
  };	

});
