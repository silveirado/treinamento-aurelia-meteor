Meteor.publish("tarefas", function(){
  if(!this.userId) {
    throw new Meteor.Error(403, "Usuário deve estar logado");
  }
  return Tarefas.find({"userId": this.userId});
});
