import { Things } from 'meteor/metemq:metemq';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('things', function() {
        return Things.find();
    });

    Things.allow({
        update: function() {
            return true;
        }
    })
}
