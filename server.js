const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likesRoutes");
const commentsRoutes = require("./routes/commentRoutes");
require("dotenv").config();

dbConnect();
app.use(express.json());

const port = process.env.PORT || 4000;

// default test route
// app.get("/", (req, res) => {
//   res.status(200).send("Hi");
// });

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/posts/:pid/comments", commentsRoutes);
app.use("/api/v1/posts/:pid/likes", likeRoutes);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
