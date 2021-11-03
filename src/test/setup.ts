import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = new MongoMemoryServer();
    await mongo.start();
    await mongoose.connect(mongo.getUri());
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
