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
            const persons = client.db("app_db").collection("person");
            const nameIndex = Math.floor(Math.random()*DATA_SIZE);
            const ageIndex = Math.floor(Math.random()*DATA_SIZE);
            const person = { name: names[nameIndex], age: ages[ageIndex] };
            await persons.insertOne(person);
            return JSON.stringify(await persons
                                                .findOne({ name: names[nameIndex], age: ages[ageIndex]}, { projection: { _id: 0, name: 1, age: 1 }}));
        }
    });

    server.route({
        options: {
            cors: {
                origin : ['*']
            }
        },
        method: 'GET',
        path: '/aggregate',
        handler: async (request, h) => {
            const persons = client.db("app_db").collection("person");
            const randomName = names[Math.floor(Math.random()*DATA_SIZE)];
            const pipeline = [
                { $match: { name: randomName } },
            ];
            let data = [];
            var t0 = performance.now();
            for await (const doc of persons.aggregate(pipeline)) {
                data.push(doc);
            }
            var t1 = performance.now();
            return JSON.stringify(t1 - t0);
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