angular.module('application')
.service('AssetService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {   
    return { 
        getAsset: function(){
            var deferred = $q.defer();            
            var data = {
                type: 'get'
            };            
            var config = {
                params: data,
                headers : {'Accept' : 'application/json'}
            };            

            $http.get(CONSTANTS.APIS.ASSET, config)
                .success(function(res){
                    deferred.resolve(res);                           
                }).
                error(function(){
                    deferred.reject(res);
                }
            );            
            return deferred.promise;            
        }
    }
}]);
