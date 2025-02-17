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


// 장소 검색
app.get('/place', async (req, res) => {
	const {idx} = req.query;
	let sql = idx ? 'SELECT * FROM place_list WHERE IDX = ?' : 'SELECT * FROM place_list';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, idx ? [idx] : []);

		console.log('✅ Success - data select');
		res.status(201).json({message:'Success - data select', data: rows});
	} catch (err) {
		console.error("❌ Fail - data select :: \n", err);
		res.status(500).json({ error: "Fail - data select" });
	}
});


// 장소 등록
app.post('/place', async (req, res) => {
	const {idx, position, content, addr, date, memo, rating} = req.body;
	const sql = `INSERT INTO place_list(idx, name, title, pos_lat, pos_lng, addr, memo, date, rating, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

	try {
		const connect = await connectDB();
		const timeOffset = 1000 * 60 * 60 * 9;
		let nowTime = new Date((new Date()).getTime() + timeOffset).toISOString().replace("T", " ").split('.')[0];
		const [rows] = await connect.execute(sql, [idx, 'name', content, position.lat, position.lng, addr, memo, date, rating, nowTime]);

		console.log('✅ Success - data insert');
		res.status(201).json({message:'Success - data insert'});
	} catch (err) {
		console.error("❌ Fail - data insert :: \n", err);
		res.status(500).json({ error: "Fail - data insert" });
	}
});


// 장소 수정
app.patch('/place', async (req, res) => {
	const {date, memo, rating, idx} = req.body;
	const sql = `UPDATE place_list SET  memo = ?, date = ?, rating = ?, mod_date = ? WHERE idx = ?`;

	try {
		const connect = await connectDB();
		const timeOffset = 1000 * 60 * 60 * 9;
		let nowTime = new Date((new Date()).getTime() + timeOffset).toISOString().replace("T", " ").split('.')[0];

		const [rows] = await connect.execute(sql, [memo, date, rating, nowTime, idx]);

		if(rows.affectedRows > 0) {
			console.log('✅ Success - data update');
			res.status(201).json({message:'Success - data update'});
		} else {
			res.status(404).json({ message: 'Fail - no matching data'});
		}
	} catch (err) {
		console.error("❌ Fail - data update :: \n", err);
		res.status(500).json({ error: "Fail - data update" });
	}
});


// 장소 삭제
app.delete('/place', async (req, res) => {
	const {idx} = req.query;
	const sql = 'DELETE FROM place_list WHERE idx = ?';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, idx ? [idx] : []);

		console.log('✅ Success - data delete');
		res.status(201).json({message:'Success - data delete', data: rows});
	} catch (err) {
		console.error("❌ Fail - data delete :: \n", err);
		res.status(500).json({ error: "Fail - data delete" });
	}
});

app.listen(port, () => {
	console.log('🚀 Server start');
});