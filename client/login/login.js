import {  Accounts } from 'meteor/accounts-base';
import {  Router } from 'aurelia-router';
import validate from 'validate.js';


const REGRAS_LOGIN = {
  "email": {
    "presence": {
      "message": "^Informe seu usuario"
    }
  },
  "senha": {
    "presence": {
      "message": "^Informe sua senha"
    }
  },
  "confirmacaoSenha": (value, attributes, attributeName, options, constraints) => {
    if (attributes.novoCadastro) {
      return {
        presence: {
          message: "^Confirme sua senha"
        },
        equality: {
          attribute: "senha",
          message: "^Confirmação de senha inválida"
        }
      };
    }
  },
  "novoCadastro": {
    presence: false
  }

};

export class Login {

  static inject() { return [Router]; }

  constructor(router){
    this.router = router;
  }

  erros = [];

  login() {
    validate
      .async(this.usuario, REGRAS_LOGIN)
      .then(() => {
        if (this.usuario.novoCadastro) {
          let userObject = {
            username: this.usuario.email,
            email: this.usuario.email,
            password: this.usuario.senha
          };
          Meteor.call("criarUsuario", userObject, (error, result) => {
            if (error) {
              alert(error.message);
              console.log("error", error);
            }
            if (result) {
              alert("Usuario criado com sucesso");
            }
          });
        } else {
          let usuario = this.usuario.email;
          let senha = this.usuario.senha;
          Meteor.loginWithPassword(usuario, senha, error => {
            if (error){
              console.dir(error);
              alert(error.message);
            } else {
              this.router.navigate("tarefas");
            }
          });
        }
      }, e => {
        this.erros = e;
      });
  }

}
