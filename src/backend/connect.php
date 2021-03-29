<?php

// db credentials
define('DB_HOST', '185.138.42.100:3306');
define('DB_USER', 'info212790_walkability');
define('DB_PASS', 'walkability_pass');
define('DB_NAME', 'info212790_walkability');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();