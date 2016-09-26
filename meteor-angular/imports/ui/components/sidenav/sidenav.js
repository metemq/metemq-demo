import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { ThingsInbox } from '../../../api/thingsInbox';
import ngMaterial from 'angular-material';

import template from './sidenav.html';


class Sidenav {
    constructor($scope, $timeout, $mdSidenav, $log) {
        'ngInject';

        Meteor.subscribe('thingsInbox');

        $scope.isLogIn = function() {
            if (Meteor.userId() == null) {
                return true;
            } else {
                return false;
            }
        }
        $scope.toggle = function() {
            $scope.toggleLeft = buildDelayedToggler('left');
        }
    }
};

const name = 'sidenav';

export default angular.module(name, [
    ngMaterial,
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: Sidenav
});

function debounce(func, wait, context) {
  var timer;

  return function debounced() {
    var context = $scope,
        args = Array.prototype.slice.call(arguments);
    $timeout.cancel(timer);
    timer = $timeout(function() {
      timer = undefined;
      func.apply(context, args);
    }, wait || 10);
  };
}

function buildDelayedToggler(navID) {
  return debounce(function() {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
  }, 200);
}
