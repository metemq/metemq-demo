import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq'
import { ThingsInbox } from 'meteor/metemq:metemq';

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        Meteor.subscribe('things');
        Meteor.subscribe('things.inbox');

        this.helpers({
            things() {
                return Things.find();
            },
            inbox() {
                return ThingsInbox.find();
            }
        });
    }
};

const name = "thingsList";

export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: ThingsList
})
  .config(config)
  .run(run);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('things', {
    url: '/things',
    template: '<things-list></things-list>'
  });
}
function run($state) {
    'ngInject';

    if (Meteor.userId() === null) {
        $state.go('abouts')
    }
}
