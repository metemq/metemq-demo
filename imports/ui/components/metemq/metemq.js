import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './metemq.html'
import { name as Navigation } from '../navigation/navigation';
import { name as ThingsList } from '../thingsList/thingsList';
import { name as Abouts } from '../abouts/abouts';
import { name as Auth } from '../auth/auth';

class Metemq {
    constructor() {
    }
}

const name = 'metemq';

export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    Navigation,
    ThingsList,
    Abouts,
    Auth,
    'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Metemq
})
  .config(config)
  .run(run);


function config($mdIconProvider, $urlRouterProvider) {
    'ngInject';

    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
      .iconSet('social',
        iconPath + 'svg-sprite-social.svg')
      .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
      .iconSet('communication',
        iconPath + 'svg-sprite-communication.svg')
      .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
      .iconSet('toggle',
        iconPath + 'svg-sprite-toggle.svg')
      .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
      .iconSet('image',
        iconPath + 'svg-sprite-image.svg');
}
function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        if (Meteor.userId() === null) {
            $state.go('abouts');
        } else {
            $state.go('things');
        }
      }
    }
  );
}
