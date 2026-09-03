require('dotenv').config();

const express = require('express');
const cors = require('cors');
const blogRoute = require('./routes/blog.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/blogs', blogRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});

