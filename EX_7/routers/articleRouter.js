const express = require("express");

const router = express.Router();

// GET all articles
router.get("/", (req, res) => {
    res.json({
        message: "Get all articles"
    });
});

// GET article by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Get article by ID",
        id: id
    });
});

// POST article
router.post("/", (req, res) => {
    const article = req.body;

    res.json({
        message: "Create article successfully",
        data: article
    });
});

// PUT article
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const article = req.body;

    res.json({
        message: "Update article successfully",
        id: id,
        data: article
    });
});

// DELETE article
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Delete article successfully",
        id: id
    });
});

module.exports = router;