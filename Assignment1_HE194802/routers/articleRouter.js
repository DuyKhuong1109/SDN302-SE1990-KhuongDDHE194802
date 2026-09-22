
const express = require('express');
const fs = require('fs');

const filePath = './data.json';

const articleRouter = express.Router();

articleRouter.use(express.json());

// Read data from data.json
const readData = async () => {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

// Write data to data.json
const writeData = async (data) => {
    await fs.promises.writeFile(
        filePath,
        JSON.stringify(data, null, 2)
    );
};


// ==================== ARTICLES ====================

// GET /articles
// Get all articles
articleRouter.route('/')
    .get(async (req, res) => {
        try {
            const data = await readData();

            res.status(200).json(data.articles);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    })

    // POST /articles
    // Create a new article
    .post(async (req, res) => {
        try {
            const data = await readData();
            const articles = data.articles;

            const newArticle = {
                id: articles.length > 0
                    ? articles[articles.length - 1].id + 1
                    : 1,

                title: req.body.title,
                date: req.body.date,
                content: req.body.content,
                author: req.body.author
            };

            articles.push(newArticle);

            // Write the whole data object
            await writeData(data);

            res.status(201).json(newArticle);

        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });


// ==================== ARTICLE BY ID ====================

// GET /articles/:id
// Get one article
articleRouter.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const data = await readData();
            const articles = data.articles;

            const article = articles.find(
                article => article.id === id
            );

            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            res.status(200).json(article);

        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    })

    // PUT /articles/:id
    // Update an article
    .put(async (req, res) => {
        try {
            const data = await readData();
            const articles = data.articles;

            const index = articles.findIndex(
                article => article.id === parseInt(req.params.id)
            );

            if (index === -1) {
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            articles[index] = {
                ...articles[index],
                ...req.body
            };

            await writeData(data);

            res.status(200).json(articles[index]);

        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    })

    // DELETE /articles/:id
    // Delete an article
    .delete(async (req, res) => {
        try {
            const data = await readData();
            const articles = data.articles;

            const index = articles.findIndex(
                article => article.id === parseInt(req.params.id)
            );

            if (index === -1) {
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            const deletedArticle = articles.splice(index, 1);

            await writeData(data);

            res.status(200).json(deletedArticle[0]);

        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });


// ==================== COMMENTS OF ARTICLE ====================

// GET /articles/:id/comments
// Get all comments of an article
articleRouter.route('/:id/comments')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const data = await readData();

            const comments = data.comments.filter(
                comment => comment.articleId === id
            );

            res.status(200).json(comments);

        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });


module.exports = articleRouter;

