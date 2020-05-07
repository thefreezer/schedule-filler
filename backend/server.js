const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const dbconfig = require("./config/db.config.js");
const app = express();
const api = require("./api/api");

/*
var corsOptions = {
  origin = "http://localhost:8000"
}
*/

//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// establishing mysql connection
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

app.use("/api", api);

// Simple query that returns 5 rows
/*
app.get("/", (req,res) => {
  conn.query("select * from uAlberta_Courses limit 5;", function(err,rows,fields){
    if(err){
      console.log("error while performing query: " + err);
      return;
    }

  res.json(rows);
  //conn.end();
  });
});

*/

// require("./server/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}.`);
});
