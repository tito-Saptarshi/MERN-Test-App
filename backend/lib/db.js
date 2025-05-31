// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log("Error in connecting to MongoDB", error);
//     process.exit(1); // 1 means failure
//   }
// };

import mongoose from "mongoose";

let cached = global.mongoose || { conn: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(process.env.MONGO_URI);
    return cached.conn;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
};