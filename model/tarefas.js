import moment from 'moment';

Tarefas = new Mongo.Collection("tarefas");

Tarefas.allow({
  insert: function(userId, document){
    document.createAt = moment().toDate();
    document.updateAt = moment().toDate();
    document.userId = userId;
    return userId;
  },
  update: function(userId, doc, fieldNames, modifier){
    set = (modifier.$set) ? modifier.$set : modifier.$unset;
    set.updateAt = moment().toDate();
    return userId;
  },
  remove: function(userId){
    return userId;
  }
});
