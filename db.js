const mysql = require('mysql2/promise');

const connectDB = async () => {
	try {
		const connect = await mysql.createConnection({
			host:"localhost",
			port: 3306,
			user: 'root',
			password: 'root',
			database: 'nomory_db'
		});

		console.log("✅ DB CONNECTED");

		return connect;
	} catch (err) {
		console.error("❌ FAIL - DB CONNECTION :: \n", err);
		throw err;
	}
}

module.exports = connectDB;