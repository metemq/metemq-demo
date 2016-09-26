import { Meteor } from 'meteor/meteor';
import { Things } from '../collection';

Meteor.publish('things', function() {
    return Things.find({});
})
