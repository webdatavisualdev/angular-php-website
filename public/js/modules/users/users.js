angular.module('application')
.directive('usersModule', [ '$http','$rootScope','$location','$uibModal','$compile','DTOptionsBuilder', 'DTColumnDefBuilder', 'UsersService', 'RoleService', function($http,$rootScope,$location,$uibModal,$compile, DTOptionsBuilder, DTColumnDefBuilder, UsersService, RoleService){
	return {
		restrict:'E',
		templateUrl:'public/js/modules/users/users.html',
		link:function(scope,elem,attr){
            scope.picFile = null;            
            scope.selectedPassword = false;
            scope.selectedUserId = '';
            scope.users = [];
            scope.roles = [];
            scope.selectedRole = {};
            scope.updateRole = {roleid:0};
            scope.newUser = {                
                clientid: 4500001,
                usr_username: '',
                usr_password: '',
                usr_email: '',
                roleid: 1,
                usr_picture: ''
            };
            scope.selectedUser = {};
            scope.alert = 'Do you want to delete this user?';            
            scope.root = $rootScope.imageRoot;
            
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
                getRoles:function(){
                    RoleService.getRoles().then(function(res){
                        console.log(res);
                        if(res.status){
                            scope.roles = res.data;
                        }                        
                    }, function(){
                        console.log('error');
                    });
                },
                
                getUsers:function(){                    
                    UsersService.getUsers().then(function(res){
                        console.log(res);
                        if(res.status){                                
                            scope.users = res.data;                            
                        }
                    }, function(){
                        console.log('error');
                    });
                },                

                addUser:function(){                    
                    scope.newUser.roleid = parseInt(scope.selectedRole.roleid);
                    if(scope.picFile)
                        scope.newUser.usr_picture = scope.picFile.name;
                    
                    UsersService.addUser(scope.newUser, scope.picFile).then(function(res){
                        console.log(res);
                        if(res.data.status){
                            scope.users.push(res.data.data);
                        }                        
                    }, function(){
                        console.log('error');
                    });
                },

                updateUser:function(){
                    scope.modalInstance.close();
                    if(scope.picFile)
                        scope.selectedUser.usr_picture = scope.picFile.name;

                    var updateData = {                
                        clientid: scope.selectedUser.clientid,
                        usr_username: scope.selectedUser.usr_username,
                        usr_password: scope.selectedUser.usr_password,
                        usr_email: scope.selectedUser.usr_email,
                        roleid: parseInt(scope.updateRole.roleid),
                        usr_picture: scope.picFile ? scope.picFile.name : scope.selectedUser.usr_picture
                    };                   

                    UsersService.updateUser(updateData, scope.picFile, scope.selectedUser.userid).then(function(res){
                        console.log(res);
                        if(res.data.status){
                            
                        }                        
                    }, function(){
                        console.log('error');
                    });
                },

                deleteUser:function(){
                    UsersService.deleteUser(scope.selectedUserId).then(function(res){                        
                        if(res.status){
                            scope.users = scope.users.filter(function(user){
                                return user.userid!=scope.selectedUserId;
                            });
                        }                        
                    }, function(){
                        console.log('error');
                    });
                },

                onUpdateUser: function(user){
                    scope.selectedUser = user;
                    let role = scope.roles.filter(function(role){
                        return role.roleid==scope.selectedUser.roleid;
                    });
                    scope.updateRole = role[0];                    
                    scope.fn.updateModalPopup();
                },

                onDeleteUser: function(uid){
                    scope.selectedUserId = uid;
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

                updateModalPopup: function() {                    
                    modal = $uibModal.open({
                        templateUrl: 'public/partials/user-update-modal.html',
                        scope: scope
                    });
            
                    scope.modalInstance = modal;
                    return modal.result
                },

                loadImage: function(file){
                    console.log(file);
                    scope.picFile = file[0];                    
                },               

                onViewPassword: function(){
                    scope.selectedPassword = !scope.selectedPassword;
                },

                ok: function() {
                    scope.modalInstance.close();
                    scope.fn.deleteUser();
                },
                cancel: function() {
                    scope.modalInstance.close();
                },

                init:function(){
                    scope.fn.getUsers();
                    scope.fn.getRoles();
				}			
            };
            
            scope.fn.init();
        }
        
	}
}])