const express = require("express");
const bodyParser = require("body-parser");
//const mysql = require("mysql");
//const dbconfig = require("./config/db.config.js");
const cors = require("cors");
const app = express();
const api = require("./api/api");

var corsOptions = {
  origin : "http://localhost:3000"
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// establishing mysql connection
/*
const conn = mysql.createConnection({
  host: dbconfig.HOST,
  user: dbconfig.USER,
  password: dbconfig.PASSWORD,
  database: dbconfig.DB
});

conn.connect(function(err){
  if(err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id: ' + conn.threadId);
});

*/

app.use("/api", api);

// require("./server/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}.`);
});
