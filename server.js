const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const descriptionRouter = require('./routes/descriptionRouter');

app.use('/api/description', descriptionRouter);

app.listen(port, function() {
    console.log('웹서버 시작!', port);
})