
const express = require('express');
const connection = require('db.js');
const port = 3001;

const app = express();

app.get('/', (req, res) => {
	connection.query('SELECT * FROM ', (err, results, field) => {
		if(err) {
			console.log('fail', err);
			res.status(500).send('server error');
			return;
		}

		res.json(results);
	});
});

app.listen(port, () => {
	console.log('server start');
});