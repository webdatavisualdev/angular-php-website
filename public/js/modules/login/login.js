// , $uibModal
angular.module('application')
.directive('loginModule',function($http,$rootScope,$location,$uibModal, $state){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/login/login.html',
		link:function(scope,elem,attr){			
            scope.server = 'lib/php/login.php';
            scope.username = 'User1';
            scope.password = 'password';
            scope.alert = '! Information you have entered dose not exit in the system, kindly contact SAC Support, using the "forgot my pasword link below"';
            
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
                                console.log(v);
                                scope.fn.modalPopup();   
                            }
                        }).
                        error(function(){
                            console.log('error');
                            scope.fn.modalPopup();
                        }
                    );
                },                
                gotoHome: function(){
                    $state.go('alert');                    
                },
                
                modalPopup: function() {
                    modal = $uibModal.open({
                        templateUrl: 'public/partials/modal.html',
                        scope: scope
                    });            
                    scope.modalInstance = modal;            
                    return modal.result;
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
