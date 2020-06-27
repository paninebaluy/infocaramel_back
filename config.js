const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit'); // used to limit repeated requests to public APIs and/or endpoints such as password reset

const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production'; // if production, we use secret from env file
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey'; // for dev mode, we use 'devSecretKey'

const connectToMongoDB = (async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/infocaraml', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}, ${err.stack}`);
    process.exit(1);
  }
});

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // timeframe for which requests are checked/remebered: 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Please try again later',
});

module.exports = {
  PORT,
  JWT_SECRET,
  connectToMongoDB,
  rateLimiter,
};
