const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' ),
    server = express();
const { setRoutes } = require( './routes' );
// For security

server.use( helmet() );

const cors = require( 'cors' ),
    // Allow Origins according to your need.
    corsOptions = {
        'origin': '*'
    };

server.use( cors( corsOptions ) );

server.use( bodyParser.json() );

// Setting up Routes
setRoutes( server );

module.exports = { server };
