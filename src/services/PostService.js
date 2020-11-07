'use strict';
const { Service } = require( '../../system/services/Service' );

class PostService extends Service {
    constructor( model ) {
        super( model );
    }

}

module.exports = { PostService };
