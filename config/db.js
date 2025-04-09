const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host:"localhost",
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'nomory_db',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

const connectDB = async () => {
	try {
		const connect = await pool.getConnection();

		connect.release();
		return connect;
	} catch (err) {
		console.error("❌ Fail - DB connected :: \n", err);
		throw err;
	}
}

module.exports = connectDB;