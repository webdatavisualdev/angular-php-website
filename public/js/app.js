var App = angular.module('application',['ngRoute','oc.lazyLoad', 'ui.router', 'ui.bootstrap','ui.utils','datatables'])
.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){
	$ocLazyLoadProvider.config({
		modules:[
            {
				name: 'first',
				files: ['public/js/modules/first/first.js',{type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'],
				cache:true
            },
            {
				name: 'home',
				files: ['public/js/modules/home/home.js',{type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'],
				cache:true
            },
            {
				name: 'login',
				files: ['public/js/modules/login/login.js',{type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'],
				cache:true
            },
            {
				name: 'users',
				files: [
                    'public/js/modules/users/users.js',
                    'public/js/services/users.service.js',
                    'public/js/services/role.service.js',
                    {type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},
                    {type:'css',path:'build/css/mods.css'},
                    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'                    
                ],
				cache:true
			},
			{
				name: 'alert',
				files: ['public/js/modules/alert/alert.js?id=1',{type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'],
				cache:true
			},
			{
				name: 'risk',
				files: ['public/js/modules/risk/risk.js?id=1'],
				cache:true
			},
			{
				name: 'detail',
				files: ['public/js/modules/detail/detail.js?id=1'],
				cache:true
			}
		]
    });

    $urlRouterProvider.otherwise('/login');
    
    $stateProvider        
        .state('first', {
            url: '/first',
            template:'<first-module></first-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('first');
                }]
            }
        })
        .state('login', {
            url: '/login',
            template:'<login-module></login-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('login');
                }]
            }
        })        
        .state('home', {
            url: '/home',
            template:'<home-module></home-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('home');
                }]
            }
        })
        .state('users', {
            url: '/users',
            template:'<users-module></users-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('users');
                }]
            }
        })
        .state('alert', {
            url: '/alert',
            template:'<alert-module></alert-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('alert');
                }]
            }
        })
        .state('detail', {
            url: '/detail',
            template:'<detail-module></detail-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('detail');
                }]
            }
        })
        .state('risk', {
            url: '/risk',
            template:'<risk-module></risk-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('risk');
                }]
            }
        });
    
})

.constant("CONSTANTS", {
    "IMAGE": "http://http://172.18.242.142/sac1/upload_files/",
    "APIS": {
        "LOGIN": "lib/php" + "/login.php",
        "USERS": "lib/php" + "/users.php",
        "ROLES": "lib/php" + "/roles.php",
    },
    "HEADER": {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept' : 'application/json'
    },        
    "SPREAD": {
        "MAX_NUMBER_OF_PHOTOS": 15,
        "NUMBER_OF_GRID_COLUMNS": 4000, 
        "NUMBER_OF_GRID_ROWS": 4000 / 2 
    }
})

.run(function($rootScope,$http,$location){
	//$rootScope.info='loaded';
    //console.log($rootScope.info);
    $rootScope.imageRoot = 'http://172.18.242.142/'
    $rootScope.alert_id=0;
    $rootScope.fn={
        toDetails:function(){
            $rootScope.alert_id=0;
            $rootScope.toDetailFrom='';
            $location.path('/detail');
        },
        logout: function(){
            $rootScope.authenticated = false;            
            window.location.replace('/');                    
        },       
    }
});
