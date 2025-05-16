require('dotenv').config();
const connectDB = require('./config/db');
const createExpressApp = require('./config/express');
const authMiddleware = require('./middleware/verifyToken');

// Connect to database
connectDB();

const app = createExpressApp();

// Import user authentication routes
const userAuthRoutes = require('./routes/userAuth');


// Mount user authentication routes
app.use('/api/auth', userAuthRoutes);


//Verify token middleware
// Add a route for token verification that uses the middleware
app.get('/api/auth/verify-token', authMiddleware, (req, res) => {
  // If the middleware passes, the token is valid
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://192.168.100.116:${PORT}`);
});
