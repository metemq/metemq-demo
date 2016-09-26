import { ThingsInbox } from '../collection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('thingsInbox', function() {
    return ThingsInbox.find({});
});
