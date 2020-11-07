'use strict';
const MediaController = require( '../controllers/MediaController' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../controllers/AuthController' );

router.get( '/:id', AuthController.checkLogin, MediaController.get );
router.post( '/', [ AuthController.checkLogin, MediaController.upload.single( 'file' ) ], MediaController.insert );
router.delete( '/:id', AuthController.checkLogin, MediaController.delete );


module.exports = router;
