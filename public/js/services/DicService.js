angular.module('DicService', [])
.factory('Dic', function($http) {

  var upload = function(filepath){
  	return $http({
      method: 'POST',
      url: '/file',
      data: { fileName: filepath }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    upload: upload
  };	

});
