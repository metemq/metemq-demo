import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './abouts.html';

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
}).config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('abouts', {
      url: '/abouts',
      template: '<abouts></abouts>'
    });
}
