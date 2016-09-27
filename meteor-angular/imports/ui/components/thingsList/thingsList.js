import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { name as Action } from '../action/action';

import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq'

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $reactive, $mdSidenav) {
        'ngInject';

        $reactive(this).attach($scope);

        Meteor.subscribe('things');

        this.helpers({
            things() {
                return Things.find();
            }
        });
    }
};

const name = "thingsList";

export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    Action
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
