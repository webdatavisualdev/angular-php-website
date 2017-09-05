angular.module('application')
.factory('LogsourcesService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {    
    return {
        getLogs: function(){
            var deferred = $q.defer();
            var data = {
                type: 'get'
            };            
            var config = {
                params: data,
                headers : {'Accept' : 'application/json'}
            };            

            $http.get(CONSTANTS.APIS.LOGS, config)
                .success(function(res){
                    deferred.resolve(res);
                }).
                error(function(){
                    deferred.reject(res);
                }
            );            
            return deferred.promise;
        },
    
        addLog: function(data, files){            
            var deferred = $q.defer();           
            var data = $.param({
                type: 'insert',
                data: data
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }

            $http.post(CONSTANTS.APIS.LOGS, data, config)
                .success(function(res){
                    if (res.data.status) {
                        deferred.resolve(res);
                    }
                    else {
                        deferred.reject(res);
                    }                           
                }).
                error(function(){
                    deferred.reject(res);
                }
            );
            return deferred.promise;
        },
    
        updateLog: function(data, files, uid){
            var deferred = $q.defer();           
            var data = $.param({
                type: 'update',
                data: data
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }

            $http.post(CONSTANTS.APIS.LOGS, data, config)
                .success(function(res){
                    if (res.data.status) {
                        deferred.resolve(res);
                    }
                    else {
                        deferred.reject(res);
                    }                           
                }).
                error(function(){
                    deferred.reject(res);
                }
            );
            return deferred.promise;
        },
    
        deleteLog: function(uid){
            var deferred = $q.defer();           
            var data = $.param({
                type: 'delete',
                uid: uid
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }

            $http.post(CONSTANTS.APIS.LOGS, data, config)
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
