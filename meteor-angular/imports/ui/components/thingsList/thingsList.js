import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import { Things } from '../../../api/things'

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('things');

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
    uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: ThingsList
});
