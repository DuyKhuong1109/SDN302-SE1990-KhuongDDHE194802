const express = require('express');
const app = express();
const port = 3000;

// Import routers
const articleRouter = require('./routers/articleRouter');
const commentRouter = require('./routers/commentRouter');

app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;