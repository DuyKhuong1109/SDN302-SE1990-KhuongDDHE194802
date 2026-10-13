const express = require("express");

const router = express.Router();

// GET all videos
router.get("/", (req, res) => {
    res.json({
        message: "Get all videos"
    });
});

// GET video by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Get video by ID",
        id: id
    });
});

// POST video
router.post("/", (req, res) => {
    const video = req.body;

    res.json({
        message: "Create video successfully",
        data: video
    });
});

// PUT video
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const video = req.body;

    res.json({
        message: "Update video successfully",
        id: id,
        data: video
    });
});

// DELETE video
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Delete video successfully",
        id: id
    });
});

module.exports = router;