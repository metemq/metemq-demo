import { Meteor } from 'meteor/meteor';
import { Things } from '../api/things/collection';

Meteor.startup(() => {
  if (Things.find().count() === 0) {
    const things = [{
      _id: 't01'
    }, {
      _id: 't02'
    }, {
      _id: 't03'
    }];

    things.forEach((thing) => {
      Things.insert(thing);
    });
  }
});
