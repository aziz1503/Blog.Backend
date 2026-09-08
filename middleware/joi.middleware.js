const Joi = require('joi');

const createBlogSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required()
});

module.exports = {
    createBlogSchema
};