const connectDB = require('../config/db');
const utils = require('../utils/utils');


// 장소 검색
const getPlace = async (req, res, next) => {
	const { idx } = req.query;
	let sql = idx ? 'SELECT * FROM place_list WHERE IDX = ?' : 'SELECT * FROM place_list';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, idx ? [idx] : []);
		res.status(200).json({ message: '장소 검색이 완료되었습니다.', data: rows });
	} catch (err) {
		next(utils.throwError('장소 검색 오류가 발생했습니다..', 500));
	}
};

// 장소 등록
const addPlace = async (req, res, next) => {
	const { idx, pos_lat, pos_lng, title, addr, date, memo, rating } = req.body;
	const sql = 'INSERT INTO place_list(idx, name, title, pos_lat, pos_lng, addr, memo, date, rating, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	try {
		const connect = await connectDB();
		const nowTime = utils.getCurrentTime();
		await connect.execute(sql, [idx, 'name', title, pos_lat, pos_lng, addr, memo, date, rating, nowTime]);
		res.status(201).json({ message: '장소 등록이 완료되었습니다.'});
	} catch (err) {
		next(utils.throwError('장소 등록 오류가 발생했습니다.', 500));
	}
};

// 장소 수정
const updatePlace = async (req, res, next) => {
	const { date, memo, rating, idx } = req.body;
	const sql = 'UPDATE place_list SET memo = ?, date = ?, rating = ?, mod_date = ? WHERE idx = ?';

	try {
		const connect = await connectDB();
		const nowTime = utils.getCurrentTime();
		const [rows] = await connect.execute(sql, [memo, date, rating, nowTime, idx]);

		if (rows.affectedRows > 0) {
			res.status(200).json({ message: '장소 수정이 완료되었습니다.' });
		} else {
			next(utils.throwError('일치하는 장소가 없습니다.', 404));
		}
	} catch (err) {
		next(utils.throwError('장소 수정 오류가 발생했습니다.', 500));
	}
};

// 장소 삭제
const deletePlace = async (req, res, next) => {
	const { idx } = req.query;
	const sql = 'DELETE FROM place_list WHERE idx = ?';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, [idx]);
		res.status(200).json({ message: '장소 삭제가 완료되었습니다.', data: rows });
	} catch (err) {
		next(utils.throwError('장소 삭제 오류가 발생했습니다.', 500));
	}
};

module.exports = {
	getPlace,
	addPlace,
	updatePlace,
	deletePlace,
};