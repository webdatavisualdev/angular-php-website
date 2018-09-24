angular.module('application')
.directive('logsourcesModule', [ '$http','$rootScope','$location','$state','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder', 'LogsourcesService', 'UsersService', function($http,$rootScope,$location,$state,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, LogsourcesService, UsersService){
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

            scope.filterConf ={
                platform: [],
                countries: [],
                locations: [],
                priorities: [],
                users: []
            }

            scope.selectedFilter = {
                country: '-1',
                platid: '-1',
                priority: '-1'
            }

            scope.dtOptions = DTOptionsBuilder
                .newOptions()                             
                .withOption('order', [1, 'asc'])
                .withOption('lengthMenu', [10, 25, 50, 100, 250, 500])                
                .withPaginationType('full_numbers');            

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
                getConfig: function(){                    
                    LogsourcesService.getConfig().then(function(res){
                        if(res.status){                           
                            scope.filterConf.platform = res.platform;
                            scope.filterConf.countries = res.countries;
                            scope.filterConf.locations = res.locations;
                            scope.filterConf.priorities = res.priorities; 
                            scope.filterConf.users = res.users;                            
                        }
                    }, function(){
                    });
                },

                getUsers: function(){
                    UsersService.getUsers().then(function(res){                        
                        if(res.status){                            
                            scope.users = res.data;
                        }
                    }, function(){
                    });
                },

                getLogs:function(){                                  
                    LogsourcesService.getLogs().then(function(res){
                        if(res.status){                                
                            scope.logs = res.data;
                        }
                    }, function(error){
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

                onRest: function(){
                    scope.selectedFilter.country = '-1';
                    scope.selectedFilter.platid = '-1';
                    scope.selectedFilter.priority = '-1';
                },

                onFilter: function(){
                    var result = scope.logs;

                    if(scope.selectedFilter.country != '-1'){
                        result = result.filter(function(log){
                            return log.ls_country==scope.selectedFilter.country;
                        });
                    }

                    if(scope.selectedFilter.platid != '-1'){
                        result = result.filter(function(log){
                            return log.platid==scope.selectedFilter.priority;
                        });
                    }

                    if(scope.selectedFilter.priority != '-1'){
                        result = result.filter(function(log){
                            return log.ls_priority==scope.selectedFilter.priority;
                        });                        
                    }
                    return result;

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
                    $rootScope.current_page = 'logsources';
                    scope.fn.getConfig();
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