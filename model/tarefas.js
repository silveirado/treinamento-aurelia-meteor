Tarefas = new Mongo.Collection("tarefas");

Tarefas.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true; 
  }
});
