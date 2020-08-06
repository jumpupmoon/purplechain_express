require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

//라우터 관련련 환경 변수 설정
const descriptionRouter = require("./routes/descriptionRouter");
const descriptionMainRouter = require("./routes/descriptionMainRouter");
const descriptions = require("./routes/descriptions");
const boardRoute = require("./routes/boardRouter");
const patientRouter = require("./routes/patientRouter");
const diseaseRouter = require("./routes/diseaseRouter");
const medicineRouter = require("./routes/medicineRouter");

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
app.use(cors());
app.use("/api/description", descriptionRouter);
app.use("/api/description", descriptionMainRouter);
app.use("/api/descriptions", descriptions); //처방전 id로 조회했을 때 나오는 결과창 라우터
app.use("/api/board", boardRoute);
app.use("/api/patient", patientRouter);
//질병 정보와 관계된 라우터 등록
app.use("/api/disease", diseaseRouter);
//의약품 정보와 관련된 라우터 등록
app.use("/api/medicine", medicineRouter);
app.use("/api/doctors", require("./routes/doctors")); //병원관리(의사) 라우터

app.listen(port, () => console.log(`서버 연결 ${port}`));
