const express = require("express");

const app = express();
const PORT = 3000;

// Middleware để đọc JSON
app.use(express.json());

// Import routers
const articleRouter = require("./routers/articleRouter");
const videoRouter = require("./routers/videoRouter");

// Sử dụng routers
app.use("/articles", articleRouter);
app.use("/videos", videoRouter);

// Trang home
app.get("/", (req, res) => {
    res.send("Welcome to Exercise 7 - Node and Express");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});