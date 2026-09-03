const router = require('express').Router();

const controller = require('../controllers/blog_controller');
const middleware = require('../middleware/validation.middleware')
const{createBlogSchema} = require('../middleware/joi.middleware')


router.get('/all', controller.getAll);

router.get('/:id', controller.getById);

router.post('/create', middleware(createBlogSchema), controller.create);

router.put('/update/:id', controller.update);

router.delete('/delete/:id', controller.remove);

module.exports = router;
