'use strict';

import mongoose from 'mongoose';

var HeroSchema = new mongoose.Schema({
  name: String,
  power: String,
  alterEgo: String
});

export default mongoose.model('Hero', HeroSchema);
