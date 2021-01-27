const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const config = require('./config');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    
    res.sendfile('index.html');
});

const pdfRoute = require('./routes/pdfmake');
app.use('/pdfMake', pdfRoute);


app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));


