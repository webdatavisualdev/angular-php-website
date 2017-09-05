angular.module('application')
.directive('logsourcesModule', [ '$http','$rootScope','$location','$state','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'LogsourcesService', function($http,$rootScope,$location,$state,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, LogsourcesService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/logsources/logsources.html',
		link:function(scope,elem,attr){            
            scope.selectedLogId = '';
            scope.selectedLog = {};
            scope.logs = [];                   
            scope.alert = 'Do you want to delete this Logsource?';            
            scope.root = $rootScope.imageRoot;
            
            scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable(),
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
                DTColumnDefBuilder.newColumnDef(5).notSortable(),
                DTColumnDefBuilder.newColumnDef(6).notSortable()
            ];           
            
			scope.fn={                
                getLogs:function(){ 
                    console.log('oooooo');                   
                    LogsourcesService.getLogs().then(function(res){
                        console.log(res);
                        if(res.status){                                
                            scope.logs = res.data;
                        }
                    }, function(){
                        console.log('error');
                    });
                },
                
                deleteLog:function(){
                    LogsourcesService.deleteLog(scope.selectedLogId).then(function(res){                        
                        if(res.status){
                            scope.users = scope.users.filter(function(user){
                                return user.userid!=scope.selectedLogId;
                            });
                        }                        
                    }, function(){
                        console.log('error');
                    });
                },

                onAddLog: function(){

                },

                onImportLog: function(){

                },

                onAdd: function(){
                    $state.go('editlogsource');
                },

                onUpdate: function(log){
                    scope.selectedLog = log;                                        
                    scope.fn.updateModalPopup();
                },

                onDelete: function(uid){
                    scope.selectedLogId = uid;
                    scope.fn.modalPopup();
                },

                modalPopup: function() {                    
                    modal = $uibModal.open({
                        templateUrl: 'public/partials/modal.html',
                        scope: scope
                    });
            
                    scope.modalInstance = modal;            
                    return modal.result
                },               
                
                ok: function() {
                    scope.modalInstance.close();
                    scope.fn.deleteLog();
                },
                cancel: function() {
                    scope.modalInstance.close();
                },

                init:function(){
                    console.log('oooooo');
                    $rootScope.current_page = 'logsources';
                    scope.fn.getLogs();                    
				}			
            };

            if($rootScope.authenticated)
                scope.fn.init();
            else
                window.location.replace('/');            
            
        }
        
	}
}])