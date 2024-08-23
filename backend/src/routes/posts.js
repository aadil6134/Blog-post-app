const express = require('express');
const db = require('../../database');
const {addPost, updatePost, getPost, getAllPosts, deletePost} = require("../models/postModel")

const router = express.Router();

router.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
})

router.post('/posts', async (req, res) => {
    const {title, content} = req.body;
    try {
        const response = await addPost(title, content);
        console.log(response);
        res.status(200).json({message: `Post created successfully with id: ${response.lastID}`})
    } catch (error) {
        res.status(400).json({message: 'Something went wrong while creating the post',error})
    }
})

router.get('/posts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await getPost(id)
        res.status(200).json(post);
    } catch (error) {
        console.error(error);        
        res.status(400).json({messae: 'Something went wrong',error});
    }
})


router.put('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try {
        const response = await updatePost(id, title, content);
        console.log(response);
        res.status(200).json({message: `Updated post with id: ${id}`})
    } catch (error) {
        
    }
})

router.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const response = await deletePost(id);
        res.status(200).json({message: `Deleted post with id: ${id}`})
    } catch (error) {
        console.error(error);
        res.status(400).json(error)
    }
})

module.exports = router;