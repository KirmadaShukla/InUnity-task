const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const groupRoutes =require('./routes/groupRoute')
const goalRoutes=require('./routes/goalRoute')
const { generatedErrors } = require('./middleware/error');
const connectDB = require('./models/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(generatedErrors);


app.use('/api/auth', userRoute);
app.use('/api/groups', groupRoutes);
app.use('/api/goals', goalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));