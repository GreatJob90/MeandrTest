<?php

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
 $answer_serv = json_encode(
 array( 
 'text' => 'Возникла ошибка при отправке данных'
 ));
 die($answer_serv);
 }

if(!isset($_POST["user_email"]))
 {
 $answer_serv = json_encode(array('type'=>'error', 'text' => 'Заполните форму'));
 die($answer_serv);
 }

$user_Name = htmlspecialchars($user_Name);
$user_Name = urldecode($user_Name);
$user_Name = trim($user_Name);
$user_Name = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);

$user_Email = htmlspecialchars($user_Email);
$user_Email = urldecode($user_Email);
$user_Email = trim($user_Email);
$user_Email = filter_var($_POST["user_email"], FILTER_SANITIZE_STRING);

$user_Phone = htmlspecialchars($user_Phone);
$user_Phone = urldecode($user_Phone);
$user_Phone = trim($user_Phone);
$user_Phone = filter_var($_POST["user_phone"], FILTER_SANITIZE_STRING);

$user_Message = htmlspecialchars($user_Message);
$user_Message = urldecode($user_Message);
$user_Message = trim($user_Message);
$user_Message = filter_var($_POST["user_message"], FILTER_SANITIZE_STRING);

$to_Email = "jergal1990@gmail.com"; 
$subject = 'Feedback form';

$msg = "Email: $user_Email\n".
       "Name: $user_Name\n".
       "Phone: $user_Phone\n".
       "Message: $user_Message";
       
 if(!mail($to_Email, $subject, $msg, "From: example@phottomap.com \r\n"))
 {
$answer_serv = json_encode(array('text' => 'Не могу отправить почту! Пожалуйста, проверьте ваши настройки PHP почты.'));
 die($answer_serv);
 }else{
$answer_serv = json_encode(array('text' => 'Спасибо! , ваше сообщение отправлено.'));
 die($answer_serv);
 }

?>