const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
//const port = 5000;
const config = require('./config');


const app = express();

//set the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//body parser middle ware
app.use(bodyParser.urlencoded({extended:true}));

//Index Route
app.get('/', (req, res)=>{
    //res.send('Hello World');
    res.sendfile('index.html');
});

const pdfRoute = require('./routes/pdfmake');
app.use('/pdfMake', pdfRoute);


app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));

// app.listen(port, () =>{
//     console.log(`Server running at http://localhost:${port}/`);
// });

