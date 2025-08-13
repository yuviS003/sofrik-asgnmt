const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in env");
  await mongoose.connect(uri, {
    // options optional with modern mongoose
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
