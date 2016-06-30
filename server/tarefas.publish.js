Meteor.publish("tarefas", function(){
  return Tarefas.find();
});
