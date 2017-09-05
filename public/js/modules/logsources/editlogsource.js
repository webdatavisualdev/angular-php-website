angular.module('application')
.directive('editlogsourceModule', [ '$http','$rootScope','$location','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'LogsourcesService', function($http,$rootScope,$location,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, LogsourcesService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/logsources/editlogsource.html',
		link:function(scope,elem,attr){            
            scope.logData = {
                platid: 0, // Asset Type
                ls_country: '', // Country
                ls_priority: 0, // Asset Value
                ls_location: 0, // location
                ls_itownid: 0, //ITadmin
                ls_escalationcontactid: 0, // Escalation
                ls_bussinessimpact: 0, //Impact
                ls_ntpversion: '', // NTP version            111
                ls_source: '', // Source                     111
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

            scope.filterConf ={
                platform: [],
                countries: [],
                priorities: []                
            }

            scope.mode = 'add';            

			scope.fn={                
                addLog:function(){                    
                    LogsourcesService.addLog(scope.logData).then(function(res){
                        console.log(res);
                        if(res.status){                                
                            console.log(res);
                        }
                    }, function(){
                        console.log('error');
                    });
                },

                updateLog:function(){                    
                    LogsourcesService.updateLog(scope.logData).then(function(res){
                        console.log(res);
                        if(res.status){                                
                            console.log(res);
                        }
                    }, function(){
                        console.log('error');
                    });
                },
                
                onSave: function(){
                    if(scope.mode=='add'){
                        fn.addLog();
                    }
                    else{
                        fn.updateLog();
                    }                    
                },               

                init:function(){
                    $rootScope.current_page = 'editlogsources';
				}			
            };

            if($rootScope.authenticated)
                scope.fn.init();
            else
                window.location.replace('/');            
            
        }
        
	}
}])