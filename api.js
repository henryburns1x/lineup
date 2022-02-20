
const express = require('express');
const config = require('./config.js');

const mongoose = require('mongoose');

const router = express.Router();

// Get the user
router.get('/user', (request, response) => {

    response.json({

        auth: true,
        valid_token: "swswsws"

    })

});

module.exports = router; 