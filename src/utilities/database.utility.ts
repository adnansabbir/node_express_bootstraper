import mongoose from 'mongoose';

export const connectToDb = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (e) {
        console.log(e);
    }
}
