const express = require('express');
const connectDB = require('./db');
const port = 3001;
const app = express();
const cors = require('cors');

app.use(cors({
	origin:'http://localhost:3000',
	optionsSuccessStatus: 200,
	Credential: true
}));

app.use(express.json());


// 장소 등록
app.post('/place', async (req, res) => {
	const {content, addrName, date, memo, rating} = req.body;
	const sql = `INSERT INTO place_list (NAME, TITLE, ADDR, DATE, MEMO, RATING, REG_DATE) VALUES (?, ?, ?, ?, ?, ?, ?)`;

	try {
		const nowTime = new Date().toISOString().replace()
		const connect = await connectDB();
		const [results] = await connect.execute(sql, ['name', content, addrName, date, memo, rating, ]);

		console.log('✅ DATA INSERT');
		res.status(201).json({message:'DATA INSERT SUCCESS'});

		connect.end();

	} catch (err) {
		console.error("❌ DB INSERT ERROR :: \n", err);
		res.status(500).json({ error: "DATA INSERT FAIL" });
	}
});

app.listen(port, () => {
	console.log('🚀 SEVER START');
});