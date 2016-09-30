import { ThingsInbox } from 'meteor/metemq:metemq';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('thingsInbox', function() {
        return ThingsInbox.find();
    });

    ThingsInbox.allow({
        update: function() {
            return true;
        }
    })
}
