const mongoose = require("mongoose");

const connectDb = () =>{

  mongoose.connect('mongodb://localhost:27017/sheycar', {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
  });

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("mongoDb connection successfull");
  });

  connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
}

connectDb()

module.exports = mongoose
