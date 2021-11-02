import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';

let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    // Cleaning the DB
    const collections = await mongoose.connection.db.collections();
    await Promise.all(collections.map(async collection => await collection.deleteMany({})))
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})
