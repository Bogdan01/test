<?php

$login = $_POST['login'];
$password = $_POST['password'];

$access = [];
if (($handle = fopen("users.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        $access[$data[0]] = $data[1];
    }
    fclose($handle);
}

if (array_key_exists($login, $access) && $access[$login] == $password) {
	echo '1';
} else {
	echo '0';
}

?>

