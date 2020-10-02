'use strict';
const express = require('express');
const path = require('path');
module.exports.setRoutes = (app) => {
  app.get('/', (req, res, next) => {
    res.send('Welcome to the APP');
  });

  app.use('/api', require('../src/routes'));

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

};
