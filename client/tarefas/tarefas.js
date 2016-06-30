import _ from 'lodash';

export class TarefasView {

  tarefas = [];
  novaTarefa = {};

  constructor() {
    Meteor.subscribe("tarefas", () => {
      Tarefas
        .find()
        .observe({
          added: tarefa => this.tarefas.push(tarefa),
          changed: tarefa => {
            let index = this.tarefas.findIndex(t => t._id === tarefa._id);
            this.tarefas.splice(index, 1, tarefa);
          },
          removed: tarefa => {
            let index = this.tarefas.findIndex(t => t._id === tarefa._id);
            this.tarefas.splice(index, 1);
          }
        });
    });
  }


  get usuario() {
    return 'Silveira';
  }

  adicionar() {
    Tarefas.insert(this.novaTarefa);
    this.novaTarefa = {};
  }

  concluir(tarefa) {
    if (tarefa.concluida) {
      Tarefas.update({
        "_id": tarefa._id
      }, {
        $set: {
          concluida: true
        }
      });
    } else {
      Tarefas.update({
        "_id": tarefa._id
      }, {
        $unset: {
          concluida: true
        }
      });
    }
  }

  limpar() {
    this.tarefas = _.reject(this.tarefas, t => t.concluida);
  }
}
