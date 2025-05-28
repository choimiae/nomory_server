const connectDB = require('../config/db');
const utils = require('../utils/utils');


// 폴더 검색
const getFolder = async (req, res, next) => {
	const { id } = req.user;
	let sql = 'SELECT idx, title, color FROM folder_list WHERE USER_ID = ?';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, [id]);
		res.status(200).json({ message: '폴더 검색이 완료되었습니다.', data: rows });
	} catch (err) {
		next(utils.throwError('폴더 검색 오류가 발생했습니다..', 500));
	}
};

// 폴더 등록
const addFolder = async (req, res, next) => {
	const { title, color } = req.body;
	const { id } = req.user;
	const sql = 'INSERT INTO folder_list(user_id, title, color) VALUES (?, ?, ?)';

	try {
		const connect = await connectDB();
		await connect.execute(sql, [id, title, color]);
		res.status(201).json({ message: '폴더 등록이 완료되었습니다.'});
	} catch (err) {
		next(utils.throwError('폴더 등록 오류가 발생했습니다.', 500));
	}
};

// 폴더 수정
const updateFolder = async (req, res, next) => {
	const { date, memo, rating, idx } = req.body;
	const sql = 'UPDATE place_list SET memo = ?, date = ?, rating = ?, mod_date = ? WHERE idx = ?';

	try {
		const connect = await connectDB();
		const nowTime = utils.getCurrentTime();
		const [rows] = await connect.execute(sql, [memo, date, rating, nowTime, idx]);

		if (rows.affectedRows > 0) {
			res.status(200).json({ message: '폴더 수정이 완료되었습니다.' });
		} else {
			next(utils.throwError('일치하는 폴더가 없습니다.', 404));
		}
	} catch (err) {
		next(utils.throwError('폴더 수정 오류가 발생했습니다.', 500));
	}
};

// 폴더 삭제
const deleteFolder = async (req, res, next) => {
	const { idx } = req.query;
	const sql = 'DELETE FROM place_list WHERE idx = ?';

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute(sql, [idx]);
		res.status(200).json({ message: '폴더 삭제가 완료되었습니다.', data: rows });
	} catch (err) {
		next(utils.throwError('폴더 삭제 오류가 발생했습니다.', 500));
	}
};

module.exports = {
	getFolder,
	addFolder,
	updateFolder,
	deleteFolder,
};