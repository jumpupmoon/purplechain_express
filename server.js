const express = require('express');
const app = express();
const port = 5000;
const boardRoute = require('./routes/boardRouter');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const descriptionRouter = require('./routes/descriptionRouter');
const descriptionMainRouter = require('./routes/descriptionMainRouter');

app.use('/api/description', descriptionRouter);
app.use('/api/description', descriptionMainRouter);
app.use('/api/board', boardRoute);

app.listen(port, function() {
    console.log('웹서버 시작!', port);
})