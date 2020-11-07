const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' ),
    config = require( '../../config/config' ).getConfig(),
    jwtKey = config.JWT_SECRET,
    jwtExpirySeconds = 172800;

class Auth {

    initSchema() {
        const schema = new Schema( {
            'token': {
                'type': String,
                'required': true,
            },
            'user': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'user'
            }
        }, { 'timestamps': true } );

        schema.statics.generateToken = async function( user ) {
            // Create a new token with the user details
            try {
                const token = await jwt.sign( {
                    '_id': user._id.toString(),
                    'email': user.email,
                    'name': user.name,
                    'role': user.role
                }, jwtKey, {
                    'algorithm': 'HS256',
                    'expiresIn': jwtExpirySeconds,
                } );

                return token;
            } catch ( e ) {
                throw e;
            }
        };

        schema.statics.decodeToken = async function( token ) {
            // Create a new token with the user details
            try {
                return await jwt.verify( token, jwtKey );
            } catch ( e ) {
                throw e;
            }
        };
        try {
            mongoose.model( 'auth', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'auth' );
    }
}

module.exports = { Auth };
