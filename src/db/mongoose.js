const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });
mongoose.connect('mongodb://127.0.0.1:27017/cork-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});
