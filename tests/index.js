// Import the dependencies for testing
const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const { server } = require( '../index' );
// Configure chai

chai.use( chaiHttp );
chai.should();
describe( 'Basic Routes Testing', () => {
    // Test to get welcome route
    it( 'should return 200 status', ( done ) => {
        chai.request( server )
            .get( '/' )
            .end( ( err, res ) => {
                if( err ) {
                    throw err;
                }
                res.should.have.status( 200 );
                done();
            } );
    } );
    // Test to get api base route
    it( 'should return 200 status', ( done ) => {
        chai.request( server )
            .get( '/api/' )
            .end( ( err, res ) => {
                if( err ) {
                    throw err;
                }
                res.should.have.status( 200 );
                done();
            } );
    } );
} );
