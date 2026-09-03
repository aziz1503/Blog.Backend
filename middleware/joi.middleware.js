const Joi = require('joi')
const createBlogSchema = Joi.object({
    title: Joi.string().min(10).max(50).required(),
    text: Joi.string().required,
    author: Joi.string().required



})

module.exports = createBlogSchema