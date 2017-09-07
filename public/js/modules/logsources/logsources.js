angular.module('application')
.directive('logsourcesModule', [ '$http','$rootScope','$location','$state','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'LogsourcesService', 'UsersService', function($http,$rootScope,$location,$state,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, LogsourcesService, UsersService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/logsources/logsources.html',
		link:function(scope,elem,attr){            
            scope.selectedLogId = '';
            scope.selectedLog = {};
            scope.logs = [];                   
            scope.alert = 'Do you want to delete this Logsource?';            
            scope.root = $rootScope.imageRoot;
            scope.users = [];

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
                getUsers: function(){
                    UsersService.getUsers().then(function(res){                        
                        if(res.status){                            
                            scope.users = res.data;
                        }
                    }, function(){
                        console.log('error');
                    });
                },

                getLogs:function(){                                  
                    LogsourcesService.getLogs().then(function(res){
                        console.log(res);
                        if(res.status){                                
                            scope.logs = res.data;
                        }
                    }, function(error){
                        console.log(error);
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

                onImportLog: function(){                    
                    $state.go('importpage');
                },

                getUser: function(itownid){
                    var result = scope.users.filter(function(user){
                        return user.userid==itownid;
                    });
                    if(result.length>0)
                        return result[0].usr_username;
                    else
                        return '';
                },

                onAdd: function(){
                    $state.go('editlogsource');
                },

                onUpdate: function(log){
                    $state.go('editlogsource',{data: log, uid: log.ls_sequence, ls_mode: 'edit'});
                },

                onDetail: function(log){                    
                    $state.go('editlogsource',{data: log, mode: 'read'});
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

                init:function(){
                    console.log('oooooo');
                    $rootScope.current_page = 'logsources';
                    scope.fn.getUsers();
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