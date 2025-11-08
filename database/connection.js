const mongoose = require('mongoose');
async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://mayank_db_user:Johnwick%21@mongodbproject.pqptyum.mongodb.net/instadb")
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;