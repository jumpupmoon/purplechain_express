require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

// Static File Service
app.use(express.static("public"));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("몽고DB 연결"))
  .catch((e) => console.error(e));

// ROUTERS
app.use("/api/descriptions", require("./routes/descriptions"));
app.use("/api/doctors", require("./routes/doctors"));

app.listen(port, () => console.log(`서버 연결 ${port}`));
