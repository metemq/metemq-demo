import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Things } from '../../../api/things'
import { ThingsInbox } from '../../../api/thingsInbox';

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('things');
        this.subscribe('thingsInbox');

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
