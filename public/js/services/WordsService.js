angular.module('WordsService', [])
.factory('Words', function($http) {

  var search = function(word, where){
    return $http({
      method: 'GET',
      url: '/search',
      params: {keyword: word, condition: where}
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    search: search
  };	

});
