const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const utils = require('../utils/utils');

const hashPw = async (password) => {
	return await bcrypt.hash(password, 10)
}

// 회원가입
const register = async (req, res, next) => {
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
			res.status(200).json({success:false, message: '이미 사용 중인 아이디입니다.'});
		} else {
			res.status(200).json({success: true, message: '중복체크가 완료되었습니다.' });
		}
	} catch (err) {
		next(utils.throwError('중복체크 오류가 발생했습니다.', 500));
	}
};

// 로그인
const login = async (req, res, next) => {
	const { id, password } = req.body;

	try {
		const connect = await connectDB();
		const [user] = await connect.execute('SELECT * FROM user_list WHERE ID = ?', [id]);

		if(user.length <= 0)
			return res.status(200).json({ success: false, message: '존재하지 않는 사용자입니다.'});

		const isMatch = await bcrypt.compare(password, user[0].password);

		if(!isMatch) {
			return res.status(200).json({ success: false, message: '비밀번호가 틀렸습니다.' });
		}

		return res.status(200).json({ success: true, message: '로그인 되었습니다.'});

	} catch (err) {
		next(utils.throwError('로그인 오류가 발생했습니다.', 500));
	}
};

module.exports = {
	register,
	checkId,
	login
};