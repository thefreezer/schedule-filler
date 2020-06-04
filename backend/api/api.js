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

// GET request to look like a true API
api.get("/:term/:term_year/:course_id/:start_time", (req,res) => {
  const term = req.params.term;
  const term_year = req.params.term_year;
  const dept_id = req.params.course_id;
  const start_time = req.params.start_time;

  // query assumes that at least one selection has been made
  // TODO: front end validation
  var sql ="select * from uAlberta_Courses where";
  
  if(term != "all"){
    // i.e: Course_term="Fall Term 2020"
    sql += " Course_term=\""+term+" Term "+term_year+"\"";
  }
  if (dept_id != "all"){
    if(term != "all")
      sql += " and ";
    if(/\d/.test(dept_id) ) // checking if there is a number
      sql += " Course_code=\""+dept_id+"\"";
    else
      sql += " Dept_id=\""+dept_id+"\"";
  }
  if(start_time != "all"){
    if (term != "all" || dept_id != "all")
      sql += " and ";
    sql += " Course_start=\""+start_time+":00\"";
  }

  sql += ";";
  console.log(sql);
  
  conn.query(sql, function(err,rows,fields){
    if(err){
      console.log("error while performing query: " + err);
      return;
    }

    console.log(rows);

  res.json(rows);
  //conn.end();
  });
});

module.exports = api;
