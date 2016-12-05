/**
 * Hero model events
 */

'use strict';

import {EventEmitter} from 'events';
import Hero from './hero.model';
var HeroEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HeroEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Hero.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HeroEvents.emit(event + ':' + doc._id, doc);
    HeroEvents.emit(event, doc);
  };
}

export default HeroEvents;
