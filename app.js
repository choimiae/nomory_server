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
	const {idx, position, content, addrName, date, memo, rating} = req.body;
	const sql = `INSERT INTO place_list (IDX, NAME, TITLE, POS_LAT, POS_LNG, ADDR, DATE, MEMO, RATING, REG_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

	try {
		const connect = await connectDB();
		const timeOffset = 1000 * 60 * 60 * 9;
		let nowTime = new Date((new Date()).getTime() + timeOffset).toISOString().replace("T", " ").split('.')[0];

		const [results] = await connect.execute(sql, [idx, 'name', content, position.lat, position.lng, addrName, date, memo, rating, nowTime]);

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