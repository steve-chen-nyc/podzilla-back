'use strict';

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  id_str: String,
  name: String,
  location: String,
  profile_image_url: String,
  provider: String,
  description: String,
  podcasts: [],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }

});

let User = mongoose.model('User', userSchema);

module.exports = User;
