'use strict';
const express = require('express');
const router = express.Router();
const { HttpError } = require('../helpers/HttpError');
const packageJson = require('../../package.json');

router.use('/media', require('./media'));
router.use('/posts', require('./post'));
router.use('/auth', require('./auth'));
router.get('/', (req, res, next) => {
    res.json({status: true, message: `Welcome to ${packageJson.name} V ${packageJson.version}`});
});

router.use('*', (req, res, next) => {
    // 404 handler
    let error = new Error('Resource not found');
    error.statusCode = 404;
    next(error);
})

router.use((err, req, res, next) => {
    console.log(err);
    const error = new HttpError(err);
    res.status(error.statusCode)
    res.json(error);
});
module.exports = router;
