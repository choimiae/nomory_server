const connectDB = require('../config/db');
const utils = require('../utils/utils');


// 회원가입
const addUser = async (req, res, next) => {
	const { id, password, nickname } = req.body;
	const sql = 'INSERT INTO user_list(id, password, nickname, date) VALUES (?, ?, ?, ?)';

	try {
		const connect = await connectDB();
		const nowTime = utils.getCurrentTime();
		await connect.execute(sql, [id, password, nickname, nowTime]);
		res.status(201).json({ message: 'Success - data insert'});
	} catch (err) {
		next(utils.throwError('Fail - data insert', 500));
	}
};

module.exports = {
	addUser,
};