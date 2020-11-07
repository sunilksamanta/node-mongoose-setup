'use strict';
const PostController = require( '../controllers/PostController' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../controllers/AuthController' );

router.get( '/', AuthController.checkLogin, PostController.getAll );
router.get( '/:id', PostController.get );
router.post( '/', PostController.insert );
router.put( '/:id', PostController.update );
router.delete( '/:id', PostController.delete );


module.exports = router;
