import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectInstacnce = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connectInstacnce.connection.host}`);
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default connectDB;
