import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq';
import { ThingsInbox } from 'meteor/metemq:metemq';

Meteor.startup(() => {
  if (Things.find().count() === 0) {
    const things = [{
      _id: 't01'
    }, {
      _id: 't02'
    }, {
      _id: 't03'
    }];

    console.log(Things.find().count());

    things.forEach((thing) => {
      Things.insert(thing);
    });
  }

  if (ThingsInbox.find().count() === 0) {
      const thingsInbox = [{
          _id: 'aaaa',
          state: 'peding',
          result: [],
          thingId: 't01',
          userId: 'u01'
      }]

      thingsInbox.forEach((inbox) => {
          ThingsInbox.insert(inbox);
      });
  }
});
