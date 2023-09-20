const express = require('express');
const cors = require('cors');
require('dotenv').config()
//--------------------------------------------------------
const SystemRoute = require('./routes/systemRoutes');


//---------------------------------------------------------


const app = express();
app.use(cors());

app.use(express.json());

//---------------------------------------------------------
app.use('/api/v1/', SystemRoute);
//---------------------------------------------------------





app.listen(8081,()=>{
    console.log("Listning on port:8081")
});

