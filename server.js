const app = require('./config/server');
const placeRoutes = require('./routes/placeRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use('/place', placeRoutes);
app.use('/auth', authRoutes);
app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server start ${PORT}`);
});