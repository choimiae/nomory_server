
// 현재 시간 가져오기
const getCurrentTime = () => {
	const timeOffset = 1000 * 60 * 60 * 9;
	return new Date((new Date()).getTime() + timeOffset).toISOString().replace("T", " ").split('.')[0];
};

// 오류 처리
const throwError = (msg, status = 500) => {
	const error = new Error(msg);
	error.status = status;

	return error;
}

module.exports = { getCurrentTime, throwError };