'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

router.route('/business')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=business&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});

router.route('/comedy')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=comedy&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});

router.route('/technology')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=technology&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});

router.route('/feelinglucky')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=podcast&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});

router.route('/ted')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=TED&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});

router.route('/sports')
  .get((req, res) => {
    appleClient('https://itunes.apple.com/search?term=sports&entity=podcast&limit=50', function(body) {
      res.send(body)
  });
});


  let appleClient = function(url,callback) {
    request(url, function(err, res, body){
      if (!err && res.statusCode == 200) {
        callback(JSON.parse(body))
      }
    })
  }

module.exports = router;
