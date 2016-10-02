// import '../imports/startup/fixtures';
import '../imports/api/users';
import '../imports/api/things';
import '../imports/api/thingsInbox';

import { Source, Things } from 'meteor/metemq:metemq'

let source = new Source();

source.methods({
    toggleLed: function() {
        Things.findOne({ _id: 'n01' }).act('toggleLed');
    }
});
