import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { name as Action } from '../action/action';

import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq'

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        $scope.data = {};

        Meteor.subscribe('things');

        this.helpers({
            things() {
                return Things.find();
            }
        });

        $scope.init = function(id) {
            let thing = Things.findOne({ _id: id });

            // Things.find({ _id: id }).observe({
            //     changed: function(newDoc, oldDoc) {
            //         thing.act('setLed', newDoc);
            //     }
            // })

            $scope.data[thing._id] = {};
            $scope.data[thing._id].fields = Object.keys(thing);
        }
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

function config($stateProvider, $mdThemingProvider) {
  'ngInject';

  $stateProvider.state('things', {
    url: '/things',
    template: '<things-list></things-list>'
  });
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
}
function run($state) {
    'ngInject';

    if (Meteor.userId() === null) {
        $state.go('abouts')
    }
}
