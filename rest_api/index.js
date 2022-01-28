'use strict';

const Hapi = require('@hapi/hapi');
const {MongoClient} = require('mongodb');

const CONNECTION_URL =  "mongodb://dan:userpassword@db:27017/app_db";
const client = new MongoClient(CONNECTION_URL);



async function connect() {
    await client.connect();
    console.log(`Connection to mongo succeded! Now running on ${CONNECTION_URL} `);
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            if(client.topology.isConnected()) {
                return h.response().code(200)
            }
            return h.response().code(404)

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