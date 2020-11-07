const { Controller } = require( '../../system/controllers/Controller' );
const { PostService } = require( './../services/PostService' );
const { Post } = require( './../models/Post' );
const autoBind = require( 'auto-bind' ),
    postService = new PostService(
        new Post().getInstance()
    );

class PostController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

module.exports = new PostController( postService );
