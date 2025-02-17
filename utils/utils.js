
const getCurrentTime = () => {
	const timeOffset = 1000 * 60 * 60 * 9;
	return new Date((new Date()).getTime() + timeOffset).toISOString().replace("T", " ").split('.')[0];
};

module.exports = { getCurrentTime };