// const validate = (req, res, next) => {
//     const { title, text, author } = req.body;
//     if (!title || !title.trim()) {

const { schema } = require("./joi.middleware");

//         return res.status(400).json({ message: "Sarlavhani kiritish majburiy!"})
//     }
//     if(!text || !text.trim()){
//         return res.status(400).json({message: "Blog matni kiritish majburiy!"})
//     }
//     if(!author || !author.trim()){
//         return res.status(400).json({message:"Muallif ismini kiritish majburiy!"})
//     }
//     next()
// }

// module.exports = validate;

const validate = (schema) => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.details.map(detail => detail.message)
            });
        }

        next();
    };

}
 module.exports = validate;