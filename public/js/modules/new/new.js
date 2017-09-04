angular.module('newapp')
.directive('newModule', function(){
	return {
		restrict: 'E',
		templateUrl:'public/js/modules/new/new.html',
		link:function(scope,elem,attr){
			console.log('new loaded');
			scope.dates=[
				{
					month:'Jan',
					day:'Sun',
					date:'15'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'16'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'17'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'18'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'19'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'20'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'21'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'22'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'23'
				},
				{
					month:'Jan',
					day:'Sun',
					date:'24'
				}
			];
			scope.listings=[
				{
					listing_id:1,
					name:''
				},
				{
					listing_id:2,
					name:''
				},
				{
					listing_id:3,
					name:''
				},
				{
					listing_id:4,
					name:''
				},
				{
					listing_id:5,
					name:''
				},
				{
					listing_id:6,
					name:''
				}
			];

			scope.reservations=[
				{
					res_id:1,
					listing_id:1,
					start_date:'16',
					end_date:'19'
				},
				{
					res_id:2,
					listing_id:3,
					start_date:'19',
					end_date:'24'
				}
			];
			var st=[
				{
					res_id:1,
					days:3
				},
				{
					res_id:2,
					days:2
				},
				{
					res_id:1,
					days:1
				},
				{
					res_id:0,
					days:1
				},
				{
					res_id:0,
					days:1
				},
				{
					res_id:0,
					days:1
				},
				{
					res_id:0,
					days:1
				}//uncommmited
			];
			scope.getStatus=function(l,date){
				// var def=['n','n','n','n','n','n','n','n','n','n','n'];
				// var arr=[];
				// for(var i=0;i<scope.reservations.length;i++){
				// 	if(scope.reservations[i].listing_id==l.listing_id){
				// 		for(var j=0;j<date.length;j++){
				// 			if(parseInt(date[j].date)<parseInt(scope.reservations[i].start_date)||parseInt(date[j].date)>parseInt(scope.reservations[i].end_date)){
				// 				arr[j]=
				// 			}else if(parseInt(date[j].date)==parseInt(scope.reservations[i].start_date)){
				// 				def="nwt3riu-half-u";
				// 			}else if(parseInt(date[j].date)>parseInt(scope.reservations[i].start_date)&&parseInt(date[j].date)<parseInt(scope.reservations[i].end_date)){
				// 				def="nwt3riu-full";
				// 			}else {
				// 				def="nwt3riu-half-b";
				// 			}
				// 		}
				// 	}else{

				// 	}
				// }
				return st;//['nwt3riu-half-u','nwt3riu-full','nwt3riu-full','nwt3riu-half-b','n','n','n','n','n','n','n'];
			}
			scope.getCellWidth=function(s){
			 	return false&&s.res_id!=0?((s.days)*70):70;
			}

		}
	}
});
