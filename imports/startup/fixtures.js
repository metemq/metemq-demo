import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq';
import { ThingsInbox } from 'meteor/metemq:metemq';

Meteor.startup(() => {
  if (Things.find().count() === 0) {
    const things = [{
      _id: 'n01',
      temperature: 23
    }, {
      _id: 'n02',
      led: 'on'
    }, {
      _id: 'e03',
      switch: 'on'
    }];

    things.forEach((thing) => {
      Things.insert(thing);
    });
  }

  if (ThingsInbox.find().count() === 0) {
      const thingsInbox = [{
          action: 'on',
          state: 'pending',
          result: [],
          thingId: 't01',
          userId: 'u01',
          checked: false
      }, {
          action: 'on',
          state: 'applied',
          result: [],
          thingId: 't02',
          userId: 'u01',
          checked: false
      }, {
          action: 'off',
          state: 'done',
          result: [],
          thingId: 't03',
          userId: 'u01',
          checked: false
      }];

      thingsInbox.forEach((inbox) => {
          ThingsInbox.insert(inbox);
      });
  }
});
