const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { Op } = require('sequelize');

// GET all posts 
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.categorie) filters.categorie = req.query.categorie;
        if (req.query.author) filters.author = req.query.author;
        if (req.query.date) {
            const start = new Date(req.query.date);
            const end = new Date(req.query.date);
            end.setDate(end.getDate() + 1);
            filters.createdAt = {
                [Op.gte]: start,
                [Op.lt]: end
            };
        }

        const posts = await Post.findAll({
            where: filters,
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET search posts
router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter "query" is required' });
        }
        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { content: { [Op.iLike]: `%${query}%` } }
                ]
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST – create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            categorie: req.body.categorie,
            tags: req.body.tags || [],
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT – update a post by ID
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (req.body.title !== undefined) post.title = req.body.title;
        if (req.body.content !== undefined) post.content = req.body.content;
        if (req.body.author !== undefined) post.author = req.body.author;
        if (req.body.categorie !== undefined) post.categorie = req.body.categorie;
        if (req.body.tags !== undefined) post.tags = req.body.tags;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE – remove a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
