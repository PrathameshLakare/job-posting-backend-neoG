const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

console.log(mongoURI);

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection) {
      console.log("Connected successfully.");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

module.exports = { initializeDatabase };
