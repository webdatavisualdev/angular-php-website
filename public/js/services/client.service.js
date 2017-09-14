angular.module('application')
.service('ClientService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {   
    return { 
        getClients: function(){
            var deferred = $q.defer();            
            var data = {
                type: 'get'
            };            
            var config = {
                params: data,
                headers : {'Accept' : 'application/json'}
            };            

            $http.get(CONSTANTS.APIS.CLIENTS, config)
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
