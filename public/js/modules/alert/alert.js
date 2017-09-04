angular.module('application')
.directive('alertModule',function($http,$location,$rootScope){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/alert/alert.html?id=1',
		link:function(scope,elem,attr){
			$rootScope.current_page="alert";
			scope.server="lib/php/formProcess.php";
			console.log('alert loaded');
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
						date_from:moment().format('YYYY-MM-DD'),
						date_to:moment().format('YYYY-MM-DD'),
						severity:['High'],
						asset_value:['5','4'],
						categories:'none'
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
						if(!(scope.var.filter.date_from<=scope.var.alerts[i].date&&scope.var.filter.date_to>=scope.var.alerts[i].date)){
							continue;
						}
						var bool=false;
						for(var j=0;j<scope.var.filter.severity.length;j++){
							if((scope.var.filter.severity[j]=='High'&&scope.var.alerts[i].al_severity>=3)||(scope.var.filter.severity[j]=='Medium'&&scope.var.alerts[i].al_severity==2)||(scope.var.filter.severity[j]=='Low'&&scope.var.alerts[i].al_severity==1)){
								bool=true;
								break;
							}
						}
						if(!bool){
							continue;
						}
						bool=false;
						for(var j=0;j<scope.var.filter.asset_value.length;j++){
							if(scope.var.filter.asset_value[j]==scope.var.alerts[i].ls_priority){
								bool=true;
								break;
							}
						}
						if(!bool){
							continue;
						}
						if(scope.var.filter.categories!='none'){
							if(!(scope.var.filter.categories==scope.var.alerts[i].al_category)){
								continue;
							}
						}
						
						arr.push(scope.var.alerts[i]);
					}
					return arr;
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
				getDetails:function(a){
					$rootScope.alert_id=a;
					$rootScope.toDetailFrom='alert';
					$location.path('/detail');
				},
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
				init:function(){
					scope.var={
						filter:{
							client_partner:'client'
						},
						client_partner:{
							clients:['123','1244','5324'],
							partners:['314','3123','4124']
						},
						categories:[],
						alerts:[],
						page:{
							page_no:'1',
							page_size:'10'
						}
					}

					scope.fn.getAlerts();
					scope.fn.getFilterConfig();
					$rootScope.current_page = 'alert';
				}
			};

			if($rootScope.authenticated)
                scope.fn.init();
            else
                window.location.replace('/');			

			scope.$watch('var.filter.client_partner',function(){
				console.log('called');
			});
		}
	}
})
.directive('datePickerFrom',function(){
	return {
		restrict:'C',
		link:function(scope,elem){
			$(elem).datepicker({
				dateFormat:'yy-mm-dd'
			}).on('change',function(){
				
				var val=this.value;
				var d=new Date(val);
				scope.$apply(function(){
					console.log('applied');
					if($('.date-picker-to:eq(0)').val()!=''){
						if($('.date-picker-to:eq(0)').val()<val){
							$('.date-picker-to:eq(0)').val(val);
						}
					}else{
						$('.date-picker-to:eq(0)').val(val);
					}
					scope.var.filter.date_from=val;
					scope.var.filter.date_to=$('.date-picker-to:eq(0)').val();

				});
				
				$('.date-picker-to').datepicker('destroy');
				$('.date-picker-to').datepicker({
					dateFormat:'yy-mm-dd',
					minDate:d
				}).off('change').on('change',function(){
					var val=this.value;
					scope.$apply(function(){
						scope.var.filter.date_to=val;
					});
				});
			});
		}
	}
})
