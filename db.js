
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user: 'root',
	password: 'root',
	database: 'nomory_db'
})

connection.connect((err) => {
	if(err) {
		console.log('FAIL - DB CONNECTION :: \n', err)
		return;
	}
	console.log('DB CONNECT');
})