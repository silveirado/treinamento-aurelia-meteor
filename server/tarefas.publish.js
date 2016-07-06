Meteor.publish("tarefas", function(){
  if(!this.userId) {
    throw new Meteor.Error(403, "Usuário deve estar logado");
  }
  return Tarefas.find({"userId": this.userId});
});

Meteor.methods({"removeBatch": function(ids) {
  debugger;
  if(!this.userId) {
    throw new Meteor.Error(403, "Usuário deve estar logado");
  }
  if(!ids || !ids.length || ids.length === 0) {
    throw new Meteor.Error(400, "Não havia ids a excluir");
  }
  Tarefas.remove({ '_id': {$in: ids} });
}})
