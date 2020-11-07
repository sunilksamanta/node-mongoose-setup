'use strict';
const defaultExcludedItemsFromResponse = [ '__v', 'password' ];

class HttpResponse {

    /**
     * @author Sunil Kumar Samanta
     * @param data : Object | Array | String
     * @param options : {totalCount: Number, statusCode: Number, deleted: Boolean}
     */
    error = false;
    responseTimestamp = new Date();

    constructor( data, options = { 'totalCount': 0, 'statusCode': 200, 'deleted': null } ) {
        this.statusCode = options.statusCode || 200;
        let filteredData = data;

        if ( typeof ( filteredData ) === 'object' ) {
            filteredData = this.filterData( JSON.parse( JSON.stringify( filteredData ) ) );
        }
        if ( options.deleted ) {
            this.deleted = options.deleted;
        }
        if ( Array.isArray( filteredData ) ) {
            this.data = [ ...filteredData ];
            this.totalCount = options.totalCount || undefined;
        } else if ( typeof ( filteredData ) === 'object' ) {
            this.data = { ...filteredData };
        } else {
            this.data = data;
        }
    }

    filterData( data ) {
        if ( Array.isArray( data ) ) {
            data.map( ( x, index ) => {
                Object.keys( x ).forEach( ( key ) => {
                    if ( defaultExcludedItemsFromResponse.includes( key ) ) {
                        delete data[ index ][ key ];
                    }
                } );
            } );
        } else if ( typeof ( data ) === 'object' ) {
            Object.keys( data ).forEach( ( key ) => {
                if ( defaultExcludedItemsFromResponse.includes( key ) ) {
                    delete data[ key ];
                }
            } );
        }
        return data;
    }
}

module.exports = { HttpResponse };
