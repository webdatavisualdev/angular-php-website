angular.module('application')
.directive('detailModule',function($http,$rootScope,$location){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/detail/detail.html?id=1',
		link:function(scope,elem,attr){
			$rootScope.current_page="detail";
			scope.server="lib/php/formProcess.php";
			scope.fn={
				getFilterConfig:function(){
					$http.post(scope.server,{getFilterConfig:2}).success(function(v){
						scope.var.client_partner.clients=v.clients;
						scope.var.client_partner.partners=v.partners;
						scope.var.categories=v.cats;
						scope.var.asset_type=v.asset_type;
						scope.var.alert_no=v.alert_no;
						scope.var.alert_name=v.alert_name;
						scope.var.logsourceid=v.logsourceid;						
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
						client_partner:'all',
						cp_no:scope.var.client_partner.clients.length>0?scope.var.client_partner.clients[0]:'',
						asset_type:'All',
						alert_no:'All',
						timestamp:'',
						alert_name:'All',
						asset_value:'All',
						categories:'All',
						risk_level:'All',
						logsourceid: $rootScope.current_user.rolename != 'Client' ? 'All' : scope.var.logsourceid[0],
					};
					console.log('filter',scope.var.filter);
					scope.var.page={
						page_no:'1',
						page_size:'10'
					}
				},
				getDetails:function(){
					var par={
						alert_id:$rootScope.alert_id,
						filter:{}
					};
					$http.post(scope.server,{getDetails:par}).success(function(v){
						if(v.status=='true'){
							scope.var.details=v.details;
						}else{
							console.log(v.status);
						}
					});
				},
				getFilteredDetails:function(){

					var arr=[];
					if($rootScope.alert_id!=0){
						arr.push($rootScope.alert_id);
						return arr;
					}
					for(var i=0;i<scope.var.details.length;i++){
						
						//filtering here
						if(scope.var.filter.client_partner!='all'){
							if(!((scope.var.filter.client_partner=='client'&&scope.var.details[i].clientid==scope.var.filter.cp_no)||(scope.var.filter.client_partner=='partner'&&scope.var.details[i].cl_partnerid==scope.var.filter.cp_no))){
								continue;
							}
						}
						if(scope.var.filter.asset_type!='All'){
							if(scope.var.filter.asset_type.match('000')){
								var grp=' '+scope.var.filter.asset_type.replace('000','');
								var val=' '+scope.var.details[i].PlatID;
								if(!(scope.var.filter.asset_type.length==scope.var.details[i].PlatID.length&&val.replace(grp,'').length==3)){
									continue;
								}
							}else{
								if(scope.var.filter.asset_type!=scope.var.details[i].PlatID){
									continue;
								}
							}
						}
						if(scope.var.filter.timestamp!=''){
							if(!(scope.var.details[i].al_incidenttime.match(scope.var.filter.timestamp))){
								continue;
							}
						}
						if(scope.var.filter.alert_no!='All'){
							if(!(scope.var.filter.alert_no==scope.var.details[i].alarmid)){
								continue;
							}
						}
						if(scope.var.filter.alert_name!='All'){
							if(!(scope.var.filter.alert_name==scope.var.details[i].al_name)){
								continue;
							}
						}
						if(scope.var.filter.categories!='All'){
							if(scope.var.filter.categories.match('00')){
								var grp=' '+scope.var.filter.categories.replace('00','');
								var val=' '+scope.var.details[i].al_category;
								if(!(scope.var.filter.categories.length==scope.var.details[i].al_category.length&&val.replace(grp,'').length==2)){
									continue;
								}
							}else{
								if(scope.var.filter.categories!=scope.var.details[i].al_category){
									continue;
								}
							}
						}
						if(scope.var.filter.risk_level!='All'){
							if(!((scope.var.filter.risk_level=='Critical'&&(scope.var.details[i].al_risklevel>10))||(scope.var.filter.risk_level=='Serious'&&(scope.var.details[i].al_risklevel>=8&&scope.var.details[i].al_risklevel<=10))||(scope.var.filter.risk_level=='Moderate'&&(scope.var.details[i].al_risklevel==6))||scope.var.filter.risk_level=='Insignificant'&&(scope.var.details[i].al_risklevel>=2&&scope.var.details[i].al_risklevel<=5)||(scope.var.filter.risk_level=='Undefined'&&(scope.var.details[i].al_risklevel==1)))){
								continue;
							}
						}
						if(scope.var.filter.asset_value!='All'){
							if(!(scope.var.filter.asset_value==scope.var.details[i].ls_priority)){
								continue;
							}
						}
						if(scope.var.filter.logsourceid!='All'){
							if(!(scope.var.filter.logsourceid==scope.var.details[i].logsourceid)){
								continue;
							}
						}



						arr.push(scope.var.details[i]);
					}
					return arr;
				},
				getContent:function(a){
					var data=a.toggleShow=='raw'?a.al_rawmessage:a.al_playbook;
					return data;
				},
				updateStatus:function(a){
					var par={
						al_sequence:a.al_sequence,
						al_incidentstatus:a.al_incidentstatus
					};
					console.log(JSON.stringify(par));
					$http.post(scope.server,{updateStatus:par}).success(function(v){
						a.changestatus_resp="Changed from "+scope.fn.getStatusValue(parseInt(v.prev))+" to "+scope.fn.getStatusValue(parseInt(a.al_incidentstatus));
						a.changestatus_show=true;
					});
				},
				getStatusValue:function(a){
					return a==5?'Defered': ( a==4?'Closed': a==3?'Escalated': ( a==2?'Triage':'Open' ) )
				},
				getTotalPage:function(){
					var arr=scope.fn.getFilteredDetails();
					if($rootScope.alert_id==0){
						return arr.length<=0?1:Math.ceil(arr.length/parseInt(scope.var.page.page_size));
					}else{
						return 1;
					}

					
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
					if($rootScope.alert_id==0){
						return parseInt(scope.var.page.page_size);
					}else{
						return 1;
					}
					
				},
				getPageLimit:function(){
					if($rootScope.alert_id==0){
						return ((scope.fn.getPageNo()-1)*scope.fn.getPageSize());
					}else{
						return 0;
					}
					
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
				getAssetType:function(a){
					if(a==undefined){
						return false;
					}
					for(var i=0;i<scope.var.asset_type.length;i++){
						if(scope.var.asset_type[i].platid==a){
							return scope.var.asset_type[i].pl_description;
						}
					}
				},
				getCatName:function(a){
					if(a==undefined){
						return false;
					}
					for(var i=0;i<scope.var.categories.length;i++){
						if(scope.var.categories[i].cateid==a){
							return scope.var.categories[i].ca_name;
						}
					}
				},
				getRiskLevel:function(l,b){
					if(l=='Undefined'){
						return b=='class'?'ri-und':'Undefined';
					}else if(l=='Insignificant'){
						return b=='class'?'ri-ins':'Insignificant';
					}else if(l=='Moderate'){
						return b=='class'?'ri-mod':'Moderate';
					}else if(l=='Serious'){
						return b=='class'?'ri-ser':'Serious';
					}else if(l=='Critical'){
						return b=='class'?'ri-cri':'Critical'
					}
				},
				getRiskLevelString:function(l){
					if(parseInt(l)<=1){
						return 'Undefined';
					}else if(parseInt(l)>=2&&parseInt(l)<=5){
						return 'Insignificant';
					}else if(parseInt(l)==6){
						return 'Moderate';
					}else if(parseInt(l)>=8&&parseInt(l)<=10){
						return 'Serious';
					}else if(parseInt(l)>10){
						return 'Critical'
					}
				},
				getMenuItems:{
					getClient:function(){
						if($rootScope.alert_id!=0){
							return 'Client:'+$rootScope.alert_id.clientid;
						}
						return scope.var.filter.client_partner=='all'?'All':( scope.var.filter.client_partner+':'+scope.var.filter.cp_no );
					},
					getRiskLevel:function(b){
						if($rootScope.alert_id!=0){
							l=scope.fn.getRiskLevelString($rootScope.alert_id.al_risklevel);
						}
						var l=l==undefined?scope.var.filter.risk_level:l;
						if((l==undefined)||l=='All'){
							return 'All';
						}
						return scope.fn.getRiskLevel(l,b);
					},
					getAssetType:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.asset_type;
						}
						return scope.var.filter.asset_type=='All'?'All':scope.fn.getAssetType(scope.var.filter.asset_type);
					},
					getTimestamp:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.al_incidenttime;
						}
						return scope.var.filter.timestamp==''?'Not set':scope.var.filter.timestamp;
					},
					getAlertName:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.al_name;
						}
						return scope.var.filter.alert_name;
					},
					getCategory:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.ca_name
						}
						return scope.var.filter.categories=='All'?'All':scope.fn.getCatName(scope.var.filter.categories);
					},
					getAssetValue:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.ls_priority;
						}
						return scope.var.filter.asset_value;
					},
					getLogSource:function(){
						if($rootScope.alert_id!=0){
							return $rootScope.alert_id.logsourceid;
						}
						return scope.var.filter.logsourceid;
					}
				},
				init:function(){
					scope.var={
						details:[],
						filter:{
							client_partner:'client'
						},
						client_partner:{
							clients:['123','1244','5324'],
							partners:['314','3123','4124']
						},
						showToggle:'raw',
						page:{
							page_no:'1',
							page_size:'10'
						}
					};
					scope.fn.getDetails();
					scope.fn.getFilterConfig();
				}

				
			}
			scope.fn.init();

			scope.$watch('var.filter.client_partner',function(){
				if(scope.var.filter.client_partner!='all'){
					scope.var.filter.cp_no=scope.fn.getClientPartner()[0];
				}
			})

			scope.$watch('var.filter.asset_type',function(){

				
			})
		}
	}
})
.directive('datePicker',function(){
	return {
		restrict:'C',
		link:function(scope,elem){
			$(elem).datepicker({
				dateFormat:'yy-mm-dd'
			}).on('change',function(){
				scope.$apply(function(){
					scope.var.filter.timestamp=$(elem).val();
				});
			})
		}
	}
})