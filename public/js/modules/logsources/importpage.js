angular.module('application')
.directive('importpageModule', [ '$http','$rootScope','$location','$state','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'LogsourcesService', function($http,$rootScope,$location,$state,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, LogsourcesService, UsersService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/logsources/importpage.html',
		link:function(scope,elem,attr){            
            scope.picFile = null;

			scope.fn={
                onDownloadTemplate: function(){

                },
                onDownloadSample: function(){

                },
                onDownloadGuid: function(){

                },
                onUploadFile: function(){

                },
                onImport: function(){

                },
                loadImage: function(){

                },


                init:function(){
                    $rootScope.current_page = 'importpage';
				}
            };

            if($rootScope.authenticated)
                scope.fn.init();
            else
                window.location.replace('/');            
        }
        
	}
}])