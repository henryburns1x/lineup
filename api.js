require('dotenv').config()

const express = require('express');
const config = require('./config.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

const port = process.env.PORT || 2000;

app.listen(port);

router.get('/user', (request, response) => {

    response.json({

        auth: true,
        valid_token: "swswsws"

    })

});

module.exports = router;
