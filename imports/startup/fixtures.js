import { Meteor } from 'meteor/meteor';
import { Things } from 'meteor/metemq:metemq';
import { ThingsInbox } from 'meteor/metemq:metemq';

Meteor.startup(() => {
  if (Things.find().count() === 0) {
    const things = [{
      _id: 't01',
      hw: 'edison',
      temperature: 23
    }, {
      _id: 't02',
      hw: 'nodeMCU',
      led: 'on'
    }, {
      _id: 't03',
      hw: 'edison',
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
