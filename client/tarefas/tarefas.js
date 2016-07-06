import _ from 'lodash';
import validate from 'validate.js';

const REGRAS_TAREFA = {
  "texto": {
    "presence": {
      "message": "^Informe o título da tarefa"
    }
  },
  "prioridade": {
    "presence": {
      "message": "^Informe a prioridade"
    }
  }
};

export class TarefasView {


  tarefas = [];
  novaTarefa = {};
  erros = {};

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
    return Meteor.user().username;
  }

  adicionar() {
    validate
      .async(this.novaTarefa, REGRAS_TAREFA)
      .then(() => {
        this.erros = undefined;
        Tarefas.insert(this.novaTarefa);
        this.novaTarefa = {};
      }, e => {
        this.erros = e;
      });
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
    if (this.tarefas && this.tarefas.length) {
      let ids = _(this.tarefas).filter(t => t.concluida).map(t => t._id).value();
      Meteor.call("removeBatch", ids);
    }
  }

}
