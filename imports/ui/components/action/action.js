import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';

import { ThingsInbox } from 'meteor/metemq:metemq';

import { Meteor } from 'meteor/meteor';

import template from './action.html';

class Action {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        Meteor.subscribe('thingsInbox');

        this.helpers({
            inbox() {
                return ThingsInbox.find({
                    checked: {
                        $not: true
                    }
                });
            }
        });

        $scope.click = function(id) {
            ThingsInbox.update({ _id: id }, { $set: {
                checked: true
            }});
        }
    }
};

const name = "action";

export default angular.module(name, [
    angularMeteor,
    ngMaterial
]).component(name, {
    template,
    controllerAs: name,
    controller: Action
}).config(config)
  .animation('.list', function() {
      return {
          leave: function (element, done) {
              element.css('left', 0);
              jQuery(element).animate({
                left: "-300px"
            }, 500, 'linear', done);
          },
          enter: function(element, done) {
              element.css('opacity',0);
              jQuery(element).animate({
                opacity: 1
              }, done);
          }
      }
  });


function config($mdThemingProvider) {
    'ngInject';
}
