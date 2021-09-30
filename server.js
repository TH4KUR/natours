const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log('Unhandled rejection: 💥 \nShutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection: 💥 \nShutting down....');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
