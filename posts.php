<?php

/* configure db access */
/*
define('DB_HOST', 'localhost');
define('DB_USER', 'user');
define('DB_PASS', 'pass');
define('DB_NAME', 'name');
*/

function checkResult($mysqli, $result) {
  if (!$result) {
    die("Error(" . $mysqli->errno . "): " . $mysqli->error);
  } 

  if ($result->num_rows == 0) {
    die("Result is empty!");
  }
}

function getUserPosts($mysqli, $userId) {
  $arr = array();

  $query = 
    "SELECT posts.post
     FROM users, posts
     WHERE $userId=users.id AND $userId=posts.user"; 
      
  $result = $mysqli->query($query);
  checkResult($mysqli, $result);

  while($post = $result->fetch_object()) {
    $arr[] = $post->post;   
  }

  $result->close();

  return $arr;
}




$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($mysqli->connect_error) {
    die("Connect Error(" . $mysqli->connect_errno . "): " . $mysqli->connect_error);
}


$arr = array();

$query = "SELECT id, username FROM users"; 
$result = $mysqli->query($query);
checkResult($mysqli, $result); 

while($user = $result->fetch_object()) {
  $arr[$user->username] = getUserPosts($mysqli, $user->id);
} 

$result->close();

$mysqli->close();



echo json_encode($arr);


?>