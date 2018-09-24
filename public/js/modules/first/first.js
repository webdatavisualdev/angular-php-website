angular.module('application')
.directive('firstModule',function($http,$rootScope,$location,$uibModal){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/first/first.html',
		link:function(scope,elem,attr){            
			scope.fn={
				
            }
				
		}
	}
});
