'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

router.route('/business')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=business&entity=podcast&limit=50', function(error, response,body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

router.route('/comedy')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=comedy&entity=podcast&limit=50', function(error, response, body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

router.route('/technology')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=technology&entity=podcast&limit=50', function(error, response, body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

router.route('/feelinglucky')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=podcast&entity=podcast&limit=50', function(error, response, body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

router.route('/ted')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=TED&entity=podcast&limit=50', function(error, response, body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

router.route('/sports')
  .get((req, res) => {
    request('https://itunes.apple.com/search?term=sports&entity=podcast&limit=50', function(error, response ,body) {
      if(error) throw error;
      if(response.statusCode !== 200){
        res.json({message: 'Bad Status Code', response.statusCode});
      }
      res.send(body)
  });
});

module.exports = router;
