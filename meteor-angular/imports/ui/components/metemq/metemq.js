import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import { DDP } from 'meteor/ddp-client';

import template from './metemq.html'
import { name as Sidenav } from '../sidenav/sidenav';
import { name as Navigation } from '../navigation/navigation';
import { name as ThingsList } from '../thingsList/thingsList';
import { name as Auth } from '../auth/auth';

class Metemq {}

const name = 'metemq';

export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    Navigation,
    Sidenav,
    ThingsList,
    Auth,
    'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Metemq
})
  .config(config);


function config($mdIconProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/things');

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
