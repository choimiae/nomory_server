const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host:"localhost",
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'nomory_db',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

const connectDB = async () => {
	try {
		const connect = await pool.getConnection();

		console.log("✅ Success - DB connected");

		connect.release();

		return connect;
	} catch (err) {
		console.error("❌ Fail - DB connected :: \n", err);
		throw err;
	}
}

module.exports = connectDB;