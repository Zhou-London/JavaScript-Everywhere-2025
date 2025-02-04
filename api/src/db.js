const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/notedly';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed Connection MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
