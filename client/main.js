import {Redirect} from 'aurelia-router';

export class App {

  configureRouter(config, router) {
    config.title = 'Hello World';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([{
      route: ['', 'home'],
      name: 'home',
      moduleId: './home/home',
      nav: true,
      title: 'Home'
    }, {
      route: 'login',
      name: 'login',
      moduleId: './login/login',
      nav: false,
      title: 'Login'
    }, {
      route: 'tarefas',
      name: 'tarefas',
      moduleId: './tarefas/tarefas',
      nav: true,
      title: 'Tarefas',
      settings: { roles: ['user'] }
    }]);
    this.router = router;
  }
}


class AuthorizeStep {
  run(navigationInstruction, next) {

    let roles = navigationInstruction.getAllInstructions()[0].config.settings.roles;
    if (roles){
      if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), roles)){
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
