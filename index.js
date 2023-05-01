require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDatabase = require("./db/connectDatabase");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");
const commentRouter = require("./routes/comment.routes");
const userRouter = require("./routes/user.routes");

const app = express();

// Apply middleware functions
app.use(express.json()); // Middleware defined by express to convert req body into json object

app.use(express.static("public"));
// app.use(logRequest);
app.use(morgan("tiny"));
app.use(cors());

// Apply routers
app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

connectDatabase().then(() => {
  app.listen(8000, () =>
    console.log("Server listening on http://localhost:8000")
  );
});
