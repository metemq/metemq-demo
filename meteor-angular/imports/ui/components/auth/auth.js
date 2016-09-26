import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';
import { name as Login } from '../login/login';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
import { name as Register } from '../register/register';
import { name as Password } from '../password/password';

const name = 'auth';

class Auth {
  constructor($scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$state = $state;

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }

  logout() {
    Accounts.logout();
    this.$state.go('abouts');
  }
}

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Login,
  Register,
  DisplayNameFilter,
  Password
]).component(name, {
  template,
  controllerAs: name,
  controller: Auth
});
