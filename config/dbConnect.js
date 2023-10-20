const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to userPostsDb successful");
  } catch (err) {
    console.log("Error in DB Connection");
    console.log(err.message);
  }
};

module.exports = dbConnect;
