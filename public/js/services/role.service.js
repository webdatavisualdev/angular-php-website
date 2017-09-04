angular.module('application')
.service('RoleService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {   
    return { 
        getRoles: function(){
            var deferred = $q.defer();            
            var data = {
                type: 'get'
            };            
            var config = {
                params: data,
                headers : {'Accept' : 'application/json'}
            };            

            $http.get(CONSTANTS.APIS.ROLES, config)
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
