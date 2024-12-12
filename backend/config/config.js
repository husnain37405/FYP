import mongoose from 'mongoose';
import 'dotenv/config'

export const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URI);
        console.log('Database is connected to:', res.connection.host, 'on Port:', res.connection?.port || 'default');
    } catch (error) {
        console.log('Connection error:', error.message);
    }
};
