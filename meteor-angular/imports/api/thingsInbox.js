import { ThingsInbox } from 'meteor/metemq:metemq';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('things.inbox', function() {
        return ThingsInbox.find();
    });
}
