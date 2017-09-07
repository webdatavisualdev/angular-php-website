angular.module('application')
.directive('editlogsourceModule', [ '$http','$rootScope','$location', '$state', '$stateParams', '$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'LogsourcesService', function($http,$rootScope,$location,$state,$stateParams,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, LogsourcesService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/logsources/editlogsource.html',
		link:function(scope,elem,attr){            
            scope.logData = {
                logsourceid: 1,
                platid: 0, // Asset Type
                ls_country: '', // Country
                ls_priority: 0, // Asset Value
                ls_location: 0, // location
                ls_itownid: 1, //ITadmin
                ls_escalationcontactid: 0, // Escalation
                ls_businessimpact: 0, //Impact                
                ls_logsformat: '', // Log Type
                ls_logprotocol: 0, // Protocol
                ls_logprort: 0, // Port
                ls_systemname: '', // System name
                ls_usage: '', // Usage
                ls_ipv4: 0, // IP
                ls_moitortype: 0, // 
                ls_monitorstatus: 0, // SOC Status
                ls_fqdn: '', // FQDN name
                ls_mac: '', // MAC
                ls_storedinformation: '', // Information in System
                ls_comment: '', // Comment
            };

            // platid
            // ls_country 
            // ls_priority
            // ls_location
            // clientid            
            // logsourceid
            // ls_2levelservicecontactconditions            
            // ls_2levelservicecontactid            
            // ls_accesspermission            
            // ls_accessprocedure            
            // ls_businessimpact            
            // ls_comment           
                       
            // ls_dataver            
            // ls_escalationcontactid            
            // ls_fqdn            
            // ls_ipv4            
            // ls_itownid            
            // ls_itsystemownerid            
                        
            // ls_logprort            
            // ls_logprotocol            
            // ls_logsformat            
            // ls_mac            
            // ls_moitortype            
            // ls_monitorstatus            
                        
            // ls_sequence            
            // ls_storedinformation            
            // ls_systemname            
            // ls_usage            
            // partnerid            
            // pl_description            
            // pl_firmware            
            // pl_name            
            // pl_sequence            
                        

            scope.filterConf ={
                platform: [],
                countries: [],
                locations: [],
                priorities: [],
                users: []
            }

            scope.selectedLog = 0;
            scope.mode = 'add';            

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
                        console.log('error');
                    });
                },

                addLog:function(){                    
                    LogsourcesService.addLog(scope.logData).then(function(res){                        
                        if(res.status){                                
                            console.log(res);
                        }
                    }, function(error){
                        console.log(error);
                    });
                },

                updateLog:function(){                    
                    LogsourcesService.updateLog(scope.logData, scope.selectedLog).then(function(res){                        
                        if(res.status){                                
                            console.log(res);
                        }
                    }, function(error){
                        console.log(error);
                    });
                },

                getClientID: function(){
                    var result = scope.filterConf.users.filter(function(user){
                        return user.userid==scope.logData.ls_itownid;
                    });
                    if(result.length>0)
                        return result[0].clientid;
                    else
                        return 1;
                },
                
                onSave: function(){
                    scope.logData.logsourceid = scope.fn.getClientID();                    
                    if(scope.mode=='add'){
                        scope.fn.addLog();
                    }
                    else{
                        scope.fn.updateLog();
                    }
                },

                updateLogData: function(destObj, srcObj){
                    for (var key in destObj) {
                        if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key)) {
                            destObj[key] = srcObj[key];
                        }
                    }
                },

                init:function(){
                    console.log('load data ', $stateParams);
                    if($stateParams.data){
                        scope.selectedLog = $stateParams.uid;                        
                        scope.mode = $stateParams.mode;
                        scope.fn.updateLogData(scope.logData,$stateParams.data);
                    }                    
                    $rootScope.current_page = 'editlogsources';
                    scope.fn.getConfig();

				}			
            };

            if($rootScope.authenticated)
                scope.fn.init();
            else
                window.location.replace('/');            
            
        }
        
	}
}])