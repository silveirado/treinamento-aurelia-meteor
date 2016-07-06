
export class Home {

  get usuario() {
    return Meteor.user() ? Meteor.user().username : "convidado";
  }
}
