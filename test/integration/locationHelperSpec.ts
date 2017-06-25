import { assert } from 'chai';
import * as geocodeApiFormattingHelper from '../../src/server/helpers/geocodeApiFormattingHelper';
import * as locationHelper from '../../src/server/helpers/locationHelper';
import * as types from '../../src/typings';
import setupSession from './setupSession';

describe('locationHelperSpec', () => {
    let db: types.IIndieJobsDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db: types.IIndieJobsDatabase) => {
        db = $db;
    });
    // describe('getLocationsFromGoogle', () => {
    //     it('Should work with propertly formatted address',
    //         () => locationHelper.getLocationsFromGoogle('Rua Henrique Surerus, 28, Juiz de Fora, MG')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 1);
    //                 assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
    //             }));
    //     it('Should work with propertly poorly formatted address',
    //         () => locationHelper.getLocationsFromGoogle(' r Henrique Surerus, 28  Juiz de Fora, /')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 1);
    //                 assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
    //             }));
    //     it('Should work with propertly poorly formatted address 2',
    //         () => locationHelper.getLocationsFromGoogle('Henrique Surerus JF')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 1);
    //                 assert.equal(res[0], 'Rua Henrique Surerus, Centro, Juiz de Fora, MG');
    //             }));
    //     it('Should work with landmarks',
    //         () => locationHelper.getLocationsFromGoogle('Shopping Alameda JF')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 1);
    //                 assert.equal(res[0], 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
    //             }));

    //     it('Should not work with city only by default',
    //         () => locationHelper.getLocationsFromGoogle('Juiz de Fora MG')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 0);
    //             }));

    //     it('Should work with city only when specified',
    //         () => locationHelper.getLocationsFromGoogle('Juiz de Fora MG')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r, true))
    //             .then((res) => {
    //                 assert.equal(res.length, 1);
    //             }));

    //     it('Should work when the address is not valid',
    //         () => locationHelper.getLocationsFromGoogle('This is not a valid city')
    //             .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
    //             .then((res) => {
    //                 assert.equal(res.length, 0);
    //             }));
    // });
    describe('getFormattedLocations', () => {
        it('checks the correct behavior', async () => {
            const searchTerm = 'henrique surerus jf';
            let locationCache = await db.geo_location_cache.findOne({ search: searchTerm });
            assert.isNotOk(locationCache);
            const formattedLocations = await locationHelper.getFormattedLocations(searchTerm, false, db);
            assert.equal(1, formattedLocations.length);
            locationCache = await db.geo_location_cache.findOne({ search: searchTerm });
            assert.ok(locationCache);
        });
    });
    // describe('saveLocation', () => {
    //     it('default case', async () => {
    //         const locationFormattedAddress = 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG';
    //         const savedLocations = await locationHelper.saveLocation(db, 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
    //         assert.equal(savedLocations[0].formatted_address, locationFormattedAddress);
    //     });
    // });
});