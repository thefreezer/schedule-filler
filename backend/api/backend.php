<?php
  // Setting headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
  header("Content-Type: application/json; charset=UTF-8");

  // Database credentials
  $servername = "localhost";
  $username = "u306849520_eden";
  $password = "Kekkanbis06";
  $dbname = "u306849520_uA_Courses";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);
  $term = $_POST['selected_term'];
  $dept_id = $_POST['selected_course'];
  $start_time = $_POST['selected_time'];

  $sql = "select * from uAlberta_Courses where";

  if($term != "all"){
    // i.e: Course_term="Fall Term 2020"
    $sql .= " Course_term=\"". $term . " term ". $_POST['selected_year'] ."\"";
  }
  if ($dept_id != "all"){
    if($term != "all")
      $sql .= " and ";
    if(preg_match('/\\d/', $dept_id) ) // checking if there is a number
      $sql .= " Course_code=\"". $dept_id ."\"";
    else
      $sql .= " Dept_id=\"". $dept_id ."\"";
  }
  if($start_time != "all"){
    if ($term != "all" || $dept_id != "all")
      $sql .= " and ";
    $sql .= " Course_start=\"". $start_time .":00\"";
  }

  $sql .= ";";
  
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
     $result = $result->fetch_all(MYSQLI_ASSOC);
     header('Content-Type: application/json');
     echo json_encode($result);
  } else {
    echo "0 results";
  }
  $conn->close();
?> 