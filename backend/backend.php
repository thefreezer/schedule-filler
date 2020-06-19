<?php
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

  $sql = "SELECT * FROM uAlberta_Courses limit 3;";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
  // output data of each row
     while($row = $result->fetch_assoc()) {
       echo "id: " . $row["Course_code"]. " - Name: " . $row["Course_name"]. " - Term: " .  $row["Course_term"]. " -Start-time: " . $row["Course_start"]."<br>";
     }
  } else {
    echo "0 results";
  }
  $conn->close();
?> 