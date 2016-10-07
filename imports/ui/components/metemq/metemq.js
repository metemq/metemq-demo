import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './metemq.html'
import { name as Navigation } from '../navigation/navigation';
import { name as ThingsList } from '../thingsList/thingsList';
import { name as Abouts } from '../abouts/abouts';
import { name as Auth } from '../auth/auth';

class Metemq {
    constructor($scope) {
        'ngInject';

        $('.body').css('height', $( window ).height() - $('#navi').height() + 'px');

        $( window ).resize(function() {
            $('.body').css('height', $( window ).height() - $('#navi').height() + 'px');
        })
    }
}

const name = 'metemq';

export default angular.module(name, [
    angularMeteor,
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


function config($urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/abouts');
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
