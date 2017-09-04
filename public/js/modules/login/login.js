// , $uibModal
angular.module('application')
.directive('loginModule',function($http,$rootScope,$location,$uibModal){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/login/login.html',
		link:function(scope,elem,attr){			
            scope.server = 'lib/php/login.php';
            scope.username = 'User 1 fist name last name';
            scope.password = 'password';
            scope.alert = '! Information you have entered dose not exit in the system, kindly contact SAV Support, using the "forgot my pasword link below';
            
			scope.fn={
				login:function(){
                    let data = {
                        username: scope.username,
                        password: scope.password
                    };
                    
                    let config = {
                        params: data,
                        headers : {'Accept' : 'application/json'}
                    };                   
                       
                    $http.get(scope.server, config)
                        .success(function(v){                            
                            if(v.status){                                
                                $rootScope.current_user = v.data;
                                $rootScope.authenticated = true;                                
                                scope.fn.gotoHome();
                            }
                            else{
                                scope.fn.modalPopupTrigger();    
                            }
                        }).
                        error(function(){
                            console.log('error');
                            scope.fn.modalPopup();
                        }
                    );
                },                
                gotoHome: function(){
                    $location.path('/detail');
                },
                
                modalPopup: function() {
                    modal = $uibModal.open({
                        templateUrl: 'public/partials/modal.html',
                        scope: scope
                    });            
                    scope.modalInstance = modal;            
                    return modal.result;
                },

                modalPopupTrigger: function() {
                    scope.fn.modalPopup()
                        .then(function(data) {
                            scope.fn.handleSuccess(data);
                        })
                        .then(null, function(reason) {
                            scope.fn.handleDismiss(reason);
                        });
                    },
            
                ok: function() {
                    scope.modalInstance.close();
                },
                cancel: function() {
                    scope.modalInstance.close();
                },
            }
				
		}
	}
});
