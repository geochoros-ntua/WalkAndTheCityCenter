<?php
require 'connect.php';
header('Access-Control-Allow-Origin: *');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);

  // do some validation
  if(trim($request->email) === '' || trim($request->city) === '') {
    return http_response_code(400);
  }
	
  // Sanitize.
  $firstName = mysqli_real_escape_string($con, trim($request->firstName));
  $lastName = mysqli_real_escape_string($con, trim($request->lastName));
  $country = mysqli_real_escape_string($con, trim($request->country));
  $organisation = mysqli_real_escape_string($con, trim($request->organisation));
  $age = mysqli_real_escape_string($con, trim($request->age));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $city = mysqli_real_escape_string($con, trim($request->city));
  $Q1 = mysqli_real_escape_string($con, trim($request->Q1));
  $Q2 = mysqli_real_escape_string($con, trim($request->Q2));
  $Q3 = mysqli_real_escape_string($con, trim($request->Q3));
  $Q4 = mysqli_real_escape_string($con, trim($request->Q4));
  $Q5 = mysqli_real_escape_string($con, trim($request->Q5));
  $Q6 = mysqli_real_escape_string($con, trim($request->Q6));
  $Q7 = mysqli_real_escape_string($con, trim($request->Q7));
  $Q8 = mysqli_real_escape_string($con, trim($request->Q8));
  $Q9 = mysqli_real_escape_string($con, trim($request->Q9));
    
  // Store.
  $sql = "INSERT INTO `survey`(`id`,`firstname`,`lastname`,`country`,`organisation`,
  `city`,`age`,`email`,`Q1`,`Q2`,`Q3`,`Q4`,`Q5`,`Q6`,`Q7`,`Q8`,`Q9`) VALUES 
  (null,'{$firstName}','{$lastName}','{$country}','{$organisation}
  ','{$city}','{$age}','{$email}','{$Q1}','{$Q2}','{$Q3}','{$Q4}','{$Q5}
  ','{$Q6}','{$Q7}','{$Q8}','{$Q9}')";
  $sqlResult = mysqli_query($con, $sql) or die(mysqli_error($con));
  if($sqlResult) {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }
}
