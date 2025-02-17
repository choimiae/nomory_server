const app = require('./config/server');
const placeRoutes = require('./routes/placeRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use('/place', placeRoutes);
app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server start ${PORT}`);
});