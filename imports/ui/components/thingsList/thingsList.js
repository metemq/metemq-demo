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

            Object.keys(thing).forEach(function(field) {
                Things.find({ _id: id }).observe({
                    changed: function(newDoc, oldDoc) {
                        if (newDoc[field] !== oldDoc[field]) {
                            let self = $(`#${id + '_' + field}`);

                            self.animate({
                                opacity: 1
                            }, 200, 'linear', function() {
                                self.css('font-size', '1.35em');
                            }).animate({
                                opacity: 1
                            }, 200, 'linear', function() {
                                self.css('font-size', '1.17em');
                            });
                        }
                    }
                });

                if (field === 'led') {
                    $scope.switch[id] = thing.led;

                    Things.find({ _id: id }).observe({
                        changed: function(newDoc, oldDoc) {
                            $scope.switch[id] = newDoc.led;
                        }
                    });
                    $scope.$watch(`switch.${id}`, function(newDoc, oldDoc) {
                        let set = newDoc;

                        Things.findOne({ _id: id }).act('setLed', set);
                    });
                }
            });
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
  $mdThemingProvider.theme('docs-dark').primaryPalette('amber');
}
function run($state) {
    'ngInject';

    if (Meteor.userId() === null) {
        $state.go('abouts')
    }
}
