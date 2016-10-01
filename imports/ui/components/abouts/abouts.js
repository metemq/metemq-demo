import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './abouts.html';

import { Meteor } from 'meteor/meteor';

class Abouts {};

const name = "abouts";

export default angular.module(name, [
    uiRouter,
    ngMaterial,
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: Abouts
}).config(config)
  .run(run);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('abouts', {
      url: '/abouts',
      template: '<abouts></abouts>'
    });
}
function run($state) {
    'ngInject';
    
    if (Meteor.userId() !== null) {
        $state.go('things');
    }
}
