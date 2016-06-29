import 'bootstrap';
import 'aurelia-polyfills';
import aureliaBootstrapper from 'aurelia-bootstrapper-meteor';
import 'aurelia-logging-console';

aureliaBootstrapper
    .bootstrap(aurelia => {
        aurelia
            .use
            .standardConfiguration();
    				//.developmentLogging();
        aurelia
            .start()
            .then(() => aurelia.setRoot('client/main', document.body));
    });
