const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
});



module.exports = { connection };
