import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://rajeshmishra2295:3AB3xr91yh90yDEz@daznassignment.wiczusn.mongodb.net/?appName=daznAssignment";


const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
