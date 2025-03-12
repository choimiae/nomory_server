const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const utils = require('../utils/utils');

const hashPw = async (password) => {
	return await bcrypt.hash(password, 10)
}

// 회원가입
const addUser = async (req, res, next) => {
	const { id, password, nickname } = req.body;
	const hashPassword = await hashPw(password);
	const sql = 'INSERT INTO user_list(id, password, nickname, date) VALUES (?, ?, ?, ?)';

	try {
		const connect = await connectDB();
		const nowTime = utils.getCurrentTime();
		await connect.execute(sql, [id, hashPassword, nickname, nowTime]);
		res.status(201).json({ message: '회원가입이 완료되었습니다.'});
	} catch (err) {
		next(utils.throwError('회원가입 오류가 발생했습니다.', 500));
	}
};

// 아이디 중복 체크
const checkId = async (req, res, next) => {
	const { id } = req.query;

	try {
		const connect = await connectDB();
		const [rows] = await connect.execute('SELECT * FROM user_list WHERE ID = ?', [id]);
		if(rows.length > 0) {
			res.status(201).json({success:false, message: '이미 사용중인 아이디입니다.'});
		} else {
			res.status(201).json({success: true, message: '중복체크가 완료되었습니다.' });
		}
	} catch (err) {
		next(utils.throwError('중복체크 오류가 발생했습니다.', 500));
	}
};

module.exports = {
	addUser,
	checkId
};