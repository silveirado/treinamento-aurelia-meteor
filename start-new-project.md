# Create a new Aurelia + Meteor Project
To create a new project run the followings commands, in linux bash:

## Install Meteor

```{r, engine='bash', count_lines}
curl https://install.meteor.com/ | sh

```

## Setup the application

```{r, engine='bash', count_lines}
meteor create todoAppAurelia
cd todoAppAurelia/
rm client/main.*
rm server/main.js
meteor remove blaze-html-templates autopublish
meteor add sdenis:aurelia fourseven:scss
meteor npm install --save aurelia-bootstrapper-meteor aurelia-router
meteor npm install --save aurelia-event-aggregator aurelia-framework aurelia-history-browser
meteor npm install --save aurelia-templating-binding aurelia-templating-resources
meteor npm install --save aurelia-templating-router lodash aurelia-logging-console
meteor npm install --save bootstrap validate.js font-awesome moment
meteor npm install --save-dev ncp babel-plugin-transform-class-properties
meteor npm install
atom .
meteor
```
