import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { name as Action } from '../action/action';

import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq'

import template from './thingsList.html';

class ThingsList {
    constructor($scope, $element, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        $scope.data = {};
        $scope.switch = {};
        $scope.hw = {};

        Meteor.subscribe('things');

        this.helpers({
            things() {
                return Things.find();
            }
        });

        $scope.init = function(id) {
            let thing = Things.findOne({ _id: id });

            if (id[0] === 'e') {
                $scope.hw[id] = 'edison';
            } else {
                $scope.hw[id] = 'nodeMCU';
            }

            $scope.data[id] = {};
            $scope.data[id].fields = Object.keys(thing);

            $scope.data[id].fields.forEach(function(value) {
                if (value === 'led') {
                    $scope.switch[id] = thing.led;

                    Things.find({ _id: id }).observe({
                        changed: function(newDoc, oldDoc) {
                            $scope.switch[id] = newDoc.led;
                        }
                    });

                    $scope.$watch(`switch.${id}`, function(newDoc, oldDoc) {
                        let set = newDoc;

                        Things.update({ _id: id }, { $set: { led: set }});
                    })
                }
            })
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
  .run(run)
  .animation('.cards', function() {
      return {
          leave: function (element, done) {
              element.css('opacity', 1);
              jQuery(element).animate({
                opacity: 0
              }, done);
          },
          enter: function(element, done) {
              element.css('opacity',0);
              jQuery(element).animate({
                opacity: 1
              }, done);
          }
      }
  });

function config($stateProvider, $mdThemingProvider) {
  'ngInject';

  $stateProvider.state('things', {
    url: '/things',
    template: '<things-list></things-list>'
  });
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  $mdThemingProvider.theme('docs-dark').primaryPalette('amber');
}
function run($state) {
    'ngInject';

    if (Meteor.userId() === null) {
        $state.go('abouts')
    }
}
