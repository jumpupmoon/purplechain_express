const express = require("express");
const app = express();
const port = 5000;
const boardRoute = require("./routes/boardRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const descriptionRouter = require("./routes/descriptionRouter");
const descriptionMainRouter = require("./routes/descriptionMainRouter");
const patientRouter = require("./routes/patientRouter");
const diseaseRouter = require("./routes/diseaseRouter");
const medicineRouter = require("./routes/medicineRouter");

app.use("/api/description", descriptionRouter);
app.use("/api/description", descriptionMainRouter);
app.use("/api/board", boardRoute);
app.use("/api/patient", patientRouter);
//질병 정보와 관계된 라우터 등록
app.use("/api/disease", diseaseRouter);
//의약품 정보와 관련된 라우터 등록
app.use("/api/medicine", medicineRouter);

app.use(cors());

app.use("/api/descriptions", require("./routes/descriptions"));
app.use("/api/doctors", require("./routes/doctors"));

app.listen(port, function () {
  console.log("웹서버 시작!", port);
});
