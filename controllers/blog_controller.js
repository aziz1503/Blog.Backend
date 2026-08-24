const service = require('../database/RW');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const skip = (page - 1) * limit;

        const data = await service.ReadData();

        const total = data.length;
        const totalPage = Math.ceil(total / limit);

        res.json({
            success: true,
            data: data.slice(skip, skip + limit),
            limit,
            page,
            totalPage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await service.ReadData();

        const item = data.find(element => element.id === id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.json({
            success: true,
            data: item
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { title, text, author } = req.body;

        const blog = {
            id: uuidv4(),
            title,
            text,
            author
        };

        await service.AppendData(blog);

        res.status(201).json({
            success: true,
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;

        const { title, text, author } = req.body;

        const blogs = await service.ReadData();

        const blog = blogs.find(element => element.id === id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        blog.title = title || blog.title;
        blog.text = text || blog.text;
        blog.author = author || blog.author;

        await service.WriteData(blogs);

        res.json({
            success: true,
            message: 'Successfully updated',
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;

        const blogs = await service.ReadData();

        const removed = blogs.filter(item => item.id !== id);

        await service.WriteData(removed);

        res.json({
            success: true,
            message: 'Successfully deleted'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};