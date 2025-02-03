
const express = require('express');
const connection = require('./db');
const port = 3001;
const app = express();

app.get('/place', (req, res) => {
	connection.query('SELECT * FROM place_list', (err, results, field) => {
		if(err) {
			console.log('FAIL - API CONNECTION :: \n', err);
			res.status(500).send('API CONNECTION ERROR');
			return;
		}

		res.json(results);
	});
});

app.post('/place', (req, res) => {
	connection.query('INSERT INTO place_list(NAME, TITLE, ADDR, MEMO, DATE) VALUES(?)', req.body, (err, results) => {
		if(err) {
			console.log('FAIL - API CONNECTION :: \n', err);
			res.status(500).send('API CONNECTION ERROR');
			return;
		}

		res.send(results);
		console.log(results);
	});
});

app.listen(port, () => {
	console.log('SEVER START');
});