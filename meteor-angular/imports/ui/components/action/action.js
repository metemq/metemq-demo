import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';

import { ThingsInbox } from 'meteor/metemq:metemq';

import { Meteor } from 'meteor/meteor';

import template from './action.html';

class Action {
    constructor($scope, $reactive, ) {
        'ngInject';

        $reactive(this).attach($scope);

        Meteor.subscribe('thingsInbox');

        this.helpers({
            inbox() {
                return ThingsInbox.find({
                    checked: false
                });
            }
        });

        $scope.$watch('state', function(newVal, oldVal) {
            if (newVal==="done") {
                
            }
        })

        $scope.click = function(state) {
            console.log($scope.state);
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
}).config(config);


function config($mdThemingProvider) {
    'ngInject';
}
