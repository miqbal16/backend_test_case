import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import app from './app.js';

dotenv.config({ path: 'config.env' });

// Database
const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(
      `${conn.connection.host} has been successfuly connected`.cyan.bold
        .underline
    );
  });

// Server running
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(
    `Server running on the port ${server.address().port} `.yellow.bold
  );
});

// Handler unhandled promise rejection error
process.on('unhandledRejection', (err, promsie) => {
  console.log(`Error: ${err.message}`.red);

  // Stop server
  server.close(() => process.exit(1));
});
