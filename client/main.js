
export class App {

  configureRouter(config, router) {
    config.title = 'Hello World';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home'},
      {route: 'tarefas', name: 'tarefas', moduleId: './tarefas/tarefas', nav: true, title: 'Tarefas'}
    ]);
    this.router = router;
  }
}
