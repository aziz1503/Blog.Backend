const serice = require('../database/RW');
const uuid = require('uuid')
const getAll = (req, res) => {

    const limit = req.params.limit || 10;
    const page = req.params.page || 1;
    const skip = (page - 1) * limit;
    const data = serice.ReadData();
    const total = data.length;
    const totalPage = Math.ceil(total / limit)
    res.json({
        data:data.slice(skip, limit*page),
        limit,
        page,
        totalPage    
    })
}

const getById = (req,res)=>{
    const id = req.params.id;
    const data = serice.ReadData();
    const item = data.find(element => element.id === id);
    res.json({
        succes:true,
        data: item
    })
}

const create = (req, res)=>{
    const {title, text, authot} = req.body;
    const blog = {
        id: uuid.v4(),
        title,
        text,
        author
    }
    serice.WriteDateJSON.stringify(blog);
    res.json({
        succes: true,
        data: response
    })
}