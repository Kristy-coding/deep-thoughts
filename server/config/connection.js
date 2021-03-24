
//This server uses Mongoose for all of its MongoDB data handling, but instead of connecting to the database right from server.js, it's actually handling the connection in the config/connection.js file. From there, the mongoose.connection object is exported.

//In server.js, we import that connection. Then when we run our server, we listen for that connection to be made with db.open(). Upon a successful connection, we start the server.

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
