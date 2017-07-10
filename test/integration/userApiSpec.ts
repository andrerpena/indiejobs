import { assert } from 'chai';
import * as userHelper from '../../src/server/services/userService';
import * as serverTypes from '../../src/server/typings';
import googleProfileSample from './resources/googleProfileSample';
import setupSession from './setupSession';

describe('userHelper', () => {
    let db: serverTypes.IndieJobsDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    describe('getValidUserName', () => {
        it('When it doesn\'t exist', () => userHelper.getValidUserName(db, 'foo').then((userName) => { assert.equal(userName, 'foo'); }),
        );
        it('When it does exist', () =>
            db.user.insert({
                name: 'foo',
                gender: 0,
                display_name: 'Foo',
                email: 'foo@fooland.com',
            })
                .then(() => userHelper.getValidUserName(db, 'foo'))
                .then((userName) => { assert.equal(userName, 'foo1'); }),
        );

        it('When it does exist 2', () =>
            db.user.insert({
                name: 'foo',
                gender: 0,
                display_name: 'Foo',
                email: 'foo@fooland.com',
            })
                .then(() => db.user.insert({
                    name: 'foo1',
                    gender: 0,
                    display_name: 'Foo',
                    email: 'foo2@fooland.com',
                }))
                .then(() => userHelper.getValidUserName(db, 'foo'))
                .then((userName) => { assert.equal(userName, 'foo2'); }),
        );
    });

    it('createFromGoogleProfile', async () => {

        const user = await userHelper.createFromGoogleProfile(db, googleProfileSample);
        assert.isOk(user);

        // let's go to the database to see if the user has actually been added
        const databaseUser = await db.user.findOne(user.id);

        assert.isOk(databaseUser);
        assert.isOk(databaseUser.oauth_profiles);
        assert.strictEqual(databaseUser.oauth_profiles.google.id, '109199054588840596357');

        await db.user.destroy({ id: databaseUser.id });
    });

    it('updateFromGoogleProfile', async () => {
        const user = (await db.user.insert({
            name: 'andrerpena',
            gender: 0,
            email: 'andrerpena@gmail.com',
            display_name: 'André Pena',
        })) as serverTypes.User;
        userHelper.updateFromGoogleProfile(db, user, googleProfileSample);
        assert.isOk(user);
        assert.isOk(user.oauth_profiles);
        assert.strictEqual(user.oauth_profiles.google.id, '109199054588840596357');

        await db.user.destroy({ id: user.id });
    });

    describe('findOrCreateFromGoogleProfile', () => {
        it('when the user did not exist yet', () =>
            db.user.findOne({ email: 'andrerpena@gmail.com' })
                .then((u) => {
                    assert.isUndefined(u);
                    return userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample);
                })

                .then((u) => {
                    assert.strictEqual(u.email, 'andrerpena@gmail.com');
                    return db.user.destroy({ id: u.id });
                }),
        );
        it('when a user with the same e-mail address already existed', () =>
            db.user.save({
                name: 'andrerpena',
                gender: 0,
                email: 'andrerpena@gmail.com',
                display_name: 'André Pena',
            })
                .then(() => userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample))
                .then((u) => {
                    assert.strictEqual(u.email, 'andrerpena@gmail.com');
                    assert.ok(u.oauth_profiles.google);
                    return db.user.destroy({ id: u.id });
                }),
        );
    });
    describe('saveProfile', () => {
        it('Basic scenario', async () => {
            const user = (await db.user.insert({
                name: 'andrerpena',
                gender: 0,
                email: 'andrerpena@gmail.com',
                display_name: 'André Pena',
            })) as serverTypes.User;

            const profile = {
                name: 'andrerpena',
                displayName: 'André Pena',
                type: 1,
                bio: 'Great developer',
                activities: 'Great software',
                phone_whatsapp: '(32) 999168205',
                address: 'Rua Henrique Surerus, 28, Juiz de Fora',
                profession: 'medico',
            };

            await userHelper.saveProfile(db, user.id, profile);
        });
    });
});
