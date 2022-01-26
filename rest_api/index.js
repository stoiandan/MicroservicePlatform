'use strict';

const Hapi = require('@hapi/hapi');
const {MongoClient} = require('mongodb');

const CONNECTION_URL =  "mongodb://dan:userpassword@db:27017/app_db";


async function connect() {
    const client = new MongoClient(CONNECTION_URL);

    try {
        await client.connect();
    } catch (e) {
        console.error(e);
        throw `Could not connect to MongoDB! Fail ${e}`;
    }
    console.log(`Connection to mongo succeded! Now running on ${CONNECTION_URL} `);
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {


        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

connect();
init();