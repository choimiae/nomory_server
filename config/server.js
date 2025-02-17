const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
	origin:'http://localhost:3000',
	optionsSuccessStatus: 200,
	Credential: true
}));
app.use(express.json());

module.exports = app;