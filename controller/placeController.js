const connectDB = require('../config/db');
const timeUtils = require('../utils/utils');


// 장소 검색
const getPlace = async (req, res) => {
	const { idx } = req.query;
	let sql = idx ? 'SELECT * FROM place_list WHERE IDX = ?' : 'SELECT * FROM place_list';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, idx ? [idx] : []);
		res.status(200).json({ message: 'Success - data select', data: rows });
	} catch (err) {
		res.status(500).json({ error: 'Fail - data select' });
	}
};

// 장소 등록
const addPlace = async (req, res) => {
	const { idx, position, content, addr, date, memo, rating } = req.body;
	const sql = 'INSERT INTO place_list(idx, name, title, pos_lat, pos_lng, addr, memo, date, rating, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	try {
		const connect = await connectDB();
		const nowTime = timeUtils.getCurrentTime();
		await connect.execute(sql, [idx, 'name', content, position.lat, position.lng, addr, memo, date, rating, nowTime]);
		res.status(201).json({ message: 'Success - data insert' });
	} catch (err) {
		res.status(500).json({ error: 'Fail - data insert' });
	}
};

// 장소 수정
const updatePlace = async (req, res) => {
	const { date, memo, rating, idx } = req.body;
	const sql = 'UPDATE place_list SET memo = ?, date = ?, rating = ?, mod_date = ? WHERE idx = ?';

	try {
		const connect = await connectDB();
		const nowTime = timeUtils.getCurrentTime();
		const [rows] = await connect.execute(sql, [memo, date, rating, nowTime, idx]);

		if (rows.affectedRows > 0) {
			res.status(200).json({ message: 'Success - data update' });
		} else {
			res.status(404).json({ message: 'Fail - no matching data' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Fail - data update' });
	}
};

// 장소 삭제
const deletePlace = async (req, res) => {
	const { idx } = req.query;
	const sql = 'DELETE FROM place_list WHERE idx = ?';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, [idx]);
		res.status(200).json({ message: 'Success - data delete', data: rows });
	} catch (err) {
		res.status(500).json({ error: 'Fail - data delete' });
	}
};

module.exports = {
	getPlace,
	addPlace,
	updatePlace,
	deletePlace,
};