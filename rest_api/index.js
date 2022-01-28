'use strict';

const Hapi = require('@hapi/hapi');
const { MongoClient } = require('mongodb');

const CONNECTION_URL = "mongodb://dan:userpassword@db:27017/app_db";
const client = new MongoClient(CONNECTION_URL);

const names = ["Dan", "Mary", "Luke", "Anton", "Silvester"];
const ages = [43, 12, 71, 39, 29];
const DATA_SIZE = 4;

async function connect() {
    await client.connect();
    console.log(`Connection to mongo succeded! Now running on ${CONNECTION_URL} `);
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: true
        }
    });

    server.route({
        options: {
            cors: {
                origin : ['*']
            }
        },
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            if (client.topology.isConnected()) {
                return h.response().code(200)
            }
            return h.response().code(404)

        }
    });

    server.route({
        options: {
            cors: {
                origin : ['*']
            }
        },
        method: 'POST',
        path: '/',
        handler: async (request, h) => {
            const nameIndex = Math.floor(Math.random()*DATA_SIZE);
            const ageIndex = Math.floor(Math.random()*DATA_SIZE);
            const person = { name: names[nameIndex], age: ages[ageIndex] };
            client.db("localDb").collection("person").insertOne(person);
            return client.db("localDb").collection("person").find({ name: names[nameIndex] });
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