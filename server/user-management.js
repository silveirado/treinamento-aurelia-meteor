
Meteor.methods({
  criarUsuario:function(user){
    console.log(user);
     let id = Accounts.createUser(user);
     Roles.addUsersToRoles(id, ['user']);
     return "OK";
  }
});
