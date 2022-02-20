const body_parser = require('body-parser');
const config = require('./config.js');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.disable('x-powered-by');
app.disable('server');
app.use(helmet());

app.use(express.static('public'));
app.use(body_parser.json());
app.use(logger('combined'));

app.use('/api', require('./api'));

app.get('*', (request, response) => {

	response.sendFile(__dirname + '/public/index.html');

});

app.listen(config.PORT, () => {

	console.log(`Server Is Up! ${config.ORIGIN} PORT: ${config.PORT}`);

});
