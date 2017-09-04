angular.module('application')
.directive('homeModule',function($http,$rootScope,$location,$uibModal){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/home/home.html',
		link:function(scope,elem,attr){                        
			scope.fn={
				logout: function(){
                    $rootScope.authenticated = false;            
                    window.location.replace('/');                    
                },
                toDetails:function(){
                    $rootScope.alert_id=0;
                    $rootScope.toDetailFrom='';
                    $location.path('/detail');
                },
            }
				
		}
	}
});
