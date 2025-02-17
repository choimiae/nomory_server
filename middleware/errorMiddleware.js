
const errorMiddleware = (err, req, res, next) => {

	console.error(err.stack);

	let statusCode = 500;
	let msg = 'Internal Server Error';

	if(err.status) {
		statusCode = err.status;
		msg = err.message || msg;
	} else if(err.response) {
		statusCode = err.response.status || 500;
		msg = err.response.data?.error || 'API 요청 실패';
	}

	res.status(statusCode).json({
		error: msg
	});
};

module.exports = errorMiddleware;