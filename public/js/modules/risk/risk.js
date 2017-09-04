angular.module('application')
.directive('riskModule',function($http,$rootScope,$location){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/risk/risk.html?id=1',
		link:function(scope,elem,attr){
			$rootScope.current_page="risk";
			scope.server="lib/php/formProcess.php";
			scope.fn={
				getFilterConfig:function(){
					$http.post(scope.server,{getFilterConfig:1}).success(function(v){
						scope.var.client_partner.clients=v.clients;
						scope.var.client_partner.partners=v.partners;
						scope.var.categories=v.cats;
						scope.fn.resetFilters();
					});
				},
				getClientPartner:function(){
					if(scope.var.filter.client_partner=='all'){
						return [];
					}else if(scope.var.filter.client_partner=='client'){
						return scope.var.client_partner.clients;
					}else{
						return scope.var.client_partner.partners;
					}
				},
				resetFilters:function(){
					scope.var.filter={
						client_partner:'client',
						cp_no:scope.var.client_partner.clients.length>0?scope.var.client_partner.clients[0]:'',
						risklevel:[],
						// rs_ind:{
						// 	all:true,
						// 	open:true,
						// 	triage:true,
						// 	escalated:true,
						// 	closed:true,
						// 	defered:true
						// },
						rs_ind:'all',
						risk_status:{
							critical:true,
							serious:true,
							moderate:false,
							insignificant:false,
							undefined:false,
						}
					};
					scope.var.page={
						page_no:'1',
						page_size:'10'
					}
					setTimeout(function(){
						$('.date-picker-to').val(scope.var.filter.date_to);
						$('.date-picker-from').trigger('change');
					},100);
				},
				getAlerts:function(){
					scope.var.alerts=[];
					$http.post(scope.server,{getAlerts:1}).success(function(v){
						if(v.status=='true'){
							scope.var.alerts=v.alerts;
						}else{
							console.log(v.status);
						}
					});
				},
				getFilteredAlerts:function(){
					var arr=[];
					for(var i=0;i<scope.var.alerts.length;i++){
						// console.log(JSON.stringify(scope.var.filter));
						if(scope.var.filter.client_partner!='all'){
							if(!((scope.var.filter.client_partner=='client'&&scope.var.alerts[i].clientid==scope.var.filter.cp_no)||(scope.var.filter.client_partner=='partner'&&scope.var.alerts[i].cl_partnerid==scope.var.filter.cp_no))){
								continue;
							}
						}
						if(scope.var.filter.rs_ind!='all'){
							if(!(parseInt(scope.var.filter.rs_ind)==parseInt(scope.var.alerts[i].al_incidentstatus))){
								continue;
							}
						}
						if(!((scope.var.filter.risk_status.critical&&(scope.var.alerts[i].al_risklevel>10))||(scope.var.filter.risk_status.serious&&(scope.var.alerts[i].al_risklevel>=8&&scope.var.alerts[i].al_risklevel<=10))||(scope.var.filter.risk_status.moderate&&(scope.var.alerts[i].al_risklevel==6))||scope.var.filter.risk_status.insignificant&&(scope.var.alerts[i].al_risklevel>=2&&scope.var.alerts[i].al_risklevel<=5)||(scope.var.filter.risk_status.undefined&&(scope.var.alerts[i].al_risklevel==1)))){
							continue;
						}


						arr.push(scope.var.alerts[i]);
					}
					return arr;
				},
				getDetails:function(a){
					$rootScope.alert_id=a;
					$rootScope.toDetailFrom='risk';
					$location.path('/detail');
				},
				// checkAll:function(){
				// 	bool=scope.var.filter.rs_ind.all;
				// 	scope.var.filter.rs_ind={
				// 		all:bool,
				// 		open:bool,
				// 		triage:bool,
				// 		escalated:bool,
				// 		closed:bool,
				// 		defered:bool
				// 	};
				// },
				getTotalPage:function(){
					var arr=scope.fn.getFilteredAlerts();
					return arr.length<=0?1:Math.ceil(arr.length/parseInt(scope.var.page.page_size));
				},
				int2Array:function(a,b){
					var arr=[];
					for(var i=a;i<=b;i++){
						arr.push(i);
					}
					return arr;
				},
				getPageNo:function(){
					return parseInt(scope.var.page.page_no);
				},
				getPageSize:function(){
					return parseInt(scope.var.page.page_size);
				},
				getPageLimit:function(){
					return ((scope.fn.getPageNo()-1)*scope.fn.getPageSize());
				},
				getPagination:function(a,m){
                    m=Math.ceil(m);
                    var min=m<=5?1:((a-2)<=0?1:a-2);
                    var max=m<=5?m:((min+4)>m?m:(min+4));
                    var ar=[];
                    for(var i=min;i<=max;i++){
                        ar.push(i);
                    }
                    while(ar.length<5&&ar[0]>1){
                        var u=ar[0]-1;
                        ar.unshift(u);
                    }
                    return ar;
				},
				incPage:function(){
					scope.var.page.page_no=(scope.fn.getPageNo()>=scope.fn.getTotalPage())?scope.fn.getTotalPage()+'':(scope.fn.getPageNo()+1)+'';
				},
				decPage:function(){
					scope.var.page.page_no=(scope.fn.getPageNo()<=1)?'1':(scope.fn.getPageNo()-1)+'';
				},
				getStatusName:function(a){
					return a==5?'Defered': ( a==4?'Closed': ( a==3?'Escalated': ( a==2?'Triage':'Open' ) ) );
				},
				getRiskLevel:function(l,b){
					if(parseInt(l)<=1){
						return b=='class'?'ri-und':'Undefined';
					}else if(parseInt(l)>=2&&parseInt(l)<=5){
						return b=='class'?'ri-ins':'Insignificant';
					}else if(parseInt(l)==6){
						return b=='class'?'ri-mod':'Moderate';
					}else if(parseInt(l)>=8&&parseInt(l)<=10){
						return b=='class'?'ri-ser':'Serious';
					}else if(parseInt(l)>10){
						return b=='class'?'ri-cri':'Critical'
					}
				},
				init:function(){
					scope.var={
						filter:{},
						client_partner:{},
						alerts:[],
						page:{
							page_no:'1',
							page_size:'10'
						}
					}
					scope.fn.getAlerts();
					scope.fn.getFilterConfig();

				}
			};
			scope.fn.init();

		}
	}
})