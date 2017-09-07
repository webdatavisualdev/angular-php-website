angular.module('application')
.factory('LogsourcesService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {    
    return {
        getConfig: function(){
            var deferred = $q.defer();
            var data = {
                type: 'config'
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
    
        addLog: function(data){
            var deferred = $q.defer();
            $http({
                url: CONSTANTS.APIS.LOGS,
                method: "POST",
                headers: { 'Content-Type': undefined },
                transformRequest: function (sendData) {
                    var formData = new FormData();
                    formData.append("data", angular.toJson(sendData.data));
                    formData.append("type", "insert");                    
                    return formData;
                },
                data: { data: data }
            }).then(function (res) {                
                if (res.data.status) {
                    deferred.resolve(res);
                }
                else {
                    deferred.reject(res);
                }                                 
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },
    
        updateLog: function(data, uid){
            var deferred = $q.defer();
            $http({
                url: CONSTANTS.APIS.LOGS,
                method: "POST",
                headers: { 'Content-Type': undefined },
                transformRequest: function (sendData) {
                    var formData = new FormData();
                    formData.append("data", angular.toJson(sendData.data));
                    formData.append("uid", sendData.uid);
                    formData.append("type", "update");
                    return formData;
                },
                data: { data: data, uid: uid }
            }).then(function (res) {                
                if (res.data.status) {
                    deferred.resolve(res);
                }
                else {
                    deferred.reject(res);
                }                                 
            }, function(res) {
                deferred.reject(res);
            });
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
