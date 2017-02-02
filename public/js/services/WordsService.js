angular.module('WordsService', [])
.factory('Words', function($http) {

  var search = function(word){
  	return $http({
      method: 'GET',
      url: '/search',
      data: { keyword: word }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    search: search
  };	

});
