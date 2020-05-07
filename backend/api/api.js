const mysql = require("mysql");
const dbconfig = require("../config/db.config.js");
const api = require("express").Router();

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


// will most likely switch to a POST req
api.get("/:term/:course_id/:start_time/:end_time", (req,res) => {
  const term = req.params.term;
  const dept_id = req.params.course_id;
  const start_time = req.params.start_time;
  const end_time = req.params.end_time;


  /*
    select * from uAlberta_Courses 
    where Dept_id=dept_id and
    Course_term=term and 
    course_start_time=start_time and
    course_end_time=end_time

   */
  
  conn.query("select * from uAlberta_Courses limit 5;", function(err,rows,fields){
    if(err){
      console.log("error while performing query: " + err);
      return;
    }

  res.json(rows);
  //conn.end();
  });
});

module.exports = api;
