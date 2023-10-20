const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  user: {
    type: String,
    required: true,
    maxLength: 50,
  },
  body: {
    type: String,
    required: true,
    maxLength: 200,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Like",
  },
});

module.exports = mongoose.model("Post", postSchema);
