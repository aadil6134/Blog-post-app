const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createPostTable } = require("./src/models/postModel");
const postsRouter = require('./src/routes/posts');

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use('/', postsRouter);

const PORT = process.env.PORT || 3000;

createPostTable()
  .then(() => {
    console.log("Posts table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating user table", error);
  });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
})