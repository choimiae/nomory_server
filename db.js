
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host:'',
	user: '',
	password: '',
	database: ''
})

connection.connect((err) => {
	if(err) {
		console.log('fail')
		return;
	}

	console.log('success');
})