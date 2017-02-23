<?php

if(isset($_POST['bombo']))
{
	$bombo=$_POST['bombo'];
	$num=rand(0,(count($bombo)-1));
}

echo $num;