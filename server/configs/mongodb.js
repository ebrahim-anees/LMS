import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    mongoose.connection.on('connected', () =>
      console.log('Connected to the database')
    );
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
