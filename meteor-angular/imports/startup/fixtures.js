import { Meteor } from 'meteor/meteor';
import { Things } from '../api/things/collection';
import { ThingsInbox } from '../api/thingsInbox/collection';

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

  if (ThingsInbox.find().count() === 0) {
      const thingsInbox = [{
          _id: 'aaaa',
          state: 'peding',
          result: [],
          thingsId: 't01',
          userId: 'u01'
      }]

      thingsInbox.forEach((inbox) => {
          ThingsInbox.insert(inbox);
      });
  }
});
