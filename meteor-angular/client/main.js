import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Metemq } from '../imports/ui/components/metemq/metemq';

function onReady() {
  angular.bootstrap(document, [
    Metemq
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
