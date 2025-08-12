import mongoose from "mongoose"


const connectionString =`${process.env.MONGO_DB_API}`; // <=== api goes by this name in .env file i have used "https://www.mongodb.com/products/platform/atlas-database"

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    return;
  }

  try {
    console.log("----Connecting to MongoDB----");
    await mongoose.connect(connectionString);
    console.log("----Connected to MongoDB----");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectDB;