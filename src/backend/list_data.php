<?php
/**
 * Returns the list of survey entries in excel format.
 */
require 'connect.php';
    
$sql = "SELECT `id`,`firstname`,`lastname`,`country`,`organisation`,
`city`,`age`,`email`,`Q1`,`Q2`,`Q3`,`Q4`,`Q5`,`Q6`,`Q7`,`Q8`,`Q9` FROM `survey`";  
$setRec = mysqli_query($con, $sql);  
$columnHeader = '';  
$columnHeader = "Id" . "\t" . "First Name" . "\t" . "Last Name" . "\t". "Country" . "\t"
. "City" . "\t". "Age" . "\t". "Email" . "\t". "Q1" . "\t". "Q2" . "\t". "Q3" . "\t". "Q4" . "\t"
. "Q5" . "\t". "Q6" . "\t". "Q7" . "\t". "Q8" . "\t". "Q9" . "\t";  
$setData = '';  
  while ($rec = mysqli_fetch_row($setRec)) {  
    $rowData = '';  
    foreach ($rec as $value) {  
        $value = '"' . $value . '"' . "\t";  
        $rowData .= $value;  
    }  
    $setData .= trim($rowData) . "\n";  
}  
  
header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename=walk_survey.xls");  
header("Pragma: no-cache");  
header("Expires: 0");  

  echo ucwords($columnHeader) . "\n" . $setData . "\n";  
 ?> 