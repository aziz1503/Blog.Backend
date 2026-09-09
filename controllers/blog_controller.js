// const service = require('../database/RW');
// const { v4: uuidv4 } = require('uuid');

// const getProducts = (req, res) => {

//     const products = Product.getAllProducts();

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;

//     if (page < 1 || limit < 1) {
//         return res.status(400).json({
//             message: "page va limit 1 dan katta bolishi kerak"
//         });
//     }

//     const total = products.length;

//     const totalPages = Math.ceil(total / limit);
    
//     const skip = (page - 1) * limit;

//     const data = products.slice(skip, skip + limit);

// }

// res.json({
//     data,
//     pagination:{
//         page,
//         limit,
//         total,
//         tatolPages,
//         hasNext: page < totalPages,
//         hasPrivous: page > 1
//     }
// })






// const getById = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const data = await service.ReadData();

//         const item = data.find(element => element.id === id);

//         if (!item) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: item
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// const create = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         const product = {
//             id: uuidv4(),
//             name,
//             description,
//             price,
//             category
//         };

//         await service.AppendData(product);

//         res.status(201).json({
//             success: true,
//             data: product
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// const update = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const { name, description, price, category } = req.body;

//         const products = await service.ReadData();

//         const product = products.find(element => element.id === id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             });
//         }

//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;

//         await service.WriteData(products);

//         res.json({
//             success: true,
//             message: 'Successfully updated',
//             data: product
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// const remove = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const products = await service.ReadData();

//         const removed = products.filter(item => item.id !== id);

//         await service.WriteData(removed);

//         res.json({
//             success: true,
//             message: 'Successfully deleted'
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// module.exports = {
//     getAll,
//     getById,
//     create,
//     update,
//     remove
// };








 const service = require('../database/RW');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
    try {
        const products = await service.ReadData();

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                message: "page va limit 1 dan kichik bo'lmasligi kerak"
            });
        }

        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const skip = (page - 1) * limit;
        const data = products.slice(skip, skip + limit);

        res.json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1
            }
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
                message: 'Product not found'
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


const getProducts = async (req, res) => {
    try {
        let products = await service.ReadData();

        const name = req.query.name;
        const category = req.query.category;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        if(minPrice){
            products = products.filter(item => item.price>=minPrice);
        }
        if(maxPrice){
            products = products.filter(item => item.price>=maxPrice)
        }

        if (name) {
            products = products.filter(item =>item.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (category) {
            products = products.filter(item =>
                item.category.toLowerCase() === category.toLowerCase()
            );
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                message: "page va limit 1 dan kichik bo'lmasligi kerak"
            });
        }

        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const skip = (page - 1) * limit;
        const data = products.slice(skip, skip + limit);

        res.json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1
            }
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
        const { name, description, price, category } = req.body;

        const product = {
            id: uuidv4(),
            name,
            description,
            price,
            category
        };

        await service.AppendData(product);

        res.status(201).json({
            success: true,
            data: product
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

        const { name, description, price, category } = req.body;

        const products = await service.ReadData();

        const product = products.find(element => element.id === id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;

        await service.WriteData(products);

        res.json({
            success: true,
            message: 'Successfully updated',
            data: product
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

        const products = await service.ReadData();

        const removed = products.filter(item => item.id !== id);

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
    getProducts,
    create,
    update,
    remove
};