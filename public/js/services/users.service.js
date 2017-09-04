angular.module('application')
.factory('UsersService', ['$q', '$http', 'CONSTANTS', function($q, $http, CONSTANTS) {    
    return {
        getUsers: function(){
            var deferred = $q.defer();
            var data = {
                type: 'get'
            };            
            var config = {
                params: data,
                headers : {'Accept' : 'application/json'}
            };            

            $http.get(CONSTANTS.APIS.USERS, config)
                .success(function(res){
                    deferred.resolve(res);                           
                }).
                error(function(){
                    deferred.reject(res);
                }
            );            
            return deferred.promise;
        },
    
        addUser: function(data, files){
            var deferred = $q.defer();
            $http({
                url: CONSTANTS.APIS.USERS,
                method: "POST",
                headers: { 'Content-Type': undefined },
                transformRequest: function (sendData) {
                    var formData = new FormData();
                    formData.append("data", angular.toJson(sendData.data));
                    formData.append("type", "insert");
                    formData.append("file", sendData.files);
                    return formData;
                },
                data: { data: data, files: files }
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
    
        updateUser: function(data, files, uid){
            var deferred = $q.defer();
            $http({
                url: CONSTANTS.APIS.USERS,
                method: "POST",
                headers: { 'Content-Type': undefined },
                transformRequest: function (sendData) {
                    var formData = new FormData();
                    formData.append("data", angular.toJson(sendData.data));
                    formData.append("type", "update");
                    formData.append("uid", sendData.uid);
                    formData.append("file", sendData.files);
                    return formData;
                },
                data: { data: data, files: files, uid: uid }
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
    
        deleteUser: function(uid){
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

            $http.post(CONSTANTS.APIS.USERS, data, config)
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
