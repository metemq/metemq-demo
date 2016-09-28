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
                    checked: false
                });
            }
        });

        $scope.change = function(state) {
            console.log(state);

            if(state === 'applied') {
                $scope.disabled = false;
            } else {
                $scope.disabled = true;
            }
        }

        $scope.stateChange = function(id, state) {
            if (state === 'applied') {
                ThingsInbox.update({ _id: id }, { $set: { state: 'done' } });
            }
        }

        $scope.isOpen = false;
        $scope.isDisabled = true;

        $scope.disabled = false;

        let iconData = [{
            name:"icon-settings",
            color:"#A00",
            theme:"md-warn md-hue-5"
        }]

        $scope.fonts = [].concat(iconData);
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
})
