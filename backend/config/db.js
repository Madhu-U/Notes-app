import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected at " + conn.connection.host);
  } catch (error) {
    console.log("MongonDB connection error " + error);
    process.exit(1);
  }
};

export default connectDB;
