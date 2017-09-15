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
                    'public/js/services/client.service.js',
                    {type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},
                    {type:'css',path:'build/css/mods.css'},
                    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js',
                    'vendors/angular-datatables-angular1/dist/angular-datatables.min.js'
                ],
				cache:true
            },
            {
				name: 'logsources',
				files: [
                    'public/js/modules/logsources/logsources.js',
                    'public/js/services/logsources.service.js',
                    'public/js/services/users.service.js',
                    'public/js/services/asset.service.js',
                    {type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},
                    {type:'css',path:'build/css/mods.css'},
                    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'                    
                ],
				cache:true
            },
            {
				name: 'editlogsource',
				files: [
                    'public/js/modules/logsources/editlogsource.js',
                    'public/js/services/logsources.service.js',
                    'public/js/services/asset.service.js',
                    {type:'css',path:'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css'},
                    {type:'css',path:'build/css/mods.css'},
                    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js','assets/js/moment.js'                    
                ],
				cache:true
            },
            {
				name: 'importpage',
				files: [
                    'public/js/modules/logsources/importpage.js',
                    'public/js/services/logsources.service.js',
                    'public/js/services/asset.service.js',
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
        .state('logsources', {
            url: '/logsources',
            template:'<logsources-module></logsources-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('logsources');
                }]
            }
        })
        .state('editlogsource', {
            url: '/editlogsource',
            params: {
                data: null,
                uid: 0,
                mode: 'edit'
            },
            template:'<editlogsource-module></editlogsource-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('editlogsource');
                }]
            }
        })
        .state('importpage', {
            url: '/importpage',            
            template:'<importpage-module></importpage-module>',
            resolve:{
                lazy:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('importpage');
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
// "IMAGE": "http://127.0.0.1/upload_files/",
.constant("CONSTANTS", {    
    "IMAGE": "http://172.18.242.142/upload_files/",    
    "APIS": {
        "LOGIN": "lib/php" + "/login.php",
        "USERS": "lib/php" + "/users.php",
        "ROLES": "lib/php" + "/roles.php",
        "LOGS":  "lib/php" + "/logsources.php",
        "ASSET": 'lib/php' + "/asset.php",
        "CLIENTS": 'lib/php' + "/clients.php"
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
    $rootScope.authenticated = false;
    //$rootScope.imageRoot = 'http://127.0.0.1/upload_files/'
    $rootScope.imageRoot = 'http://127.0.0.1/upload_files/'
    $rootScope.alert_id=0;
    $rootScope.current_page = '';    
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
