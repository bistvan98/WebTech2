const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRoute = require('./controller/auth');
const productRoute = require('./controller/product');

const app = express();
const port = process.env.port || 9000;

mongoose.connect("mongodb://localhost:27017/webtech2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/product', productRoute);
app.use('/user', authRoute);

const server = app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});