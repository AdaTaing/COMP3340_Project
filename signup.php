<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    $host = "localhost";
    $name = "tainga_";
    $pwd = "pants_#Data";
    $dbname = "tainga_PantsUsers";
    $table = "Table"

    $conn = new mysqli_connect($host, $name, $pwd, $dbname);
    if($conn ->connect_error) {
        die('Error : ' .$conn-> connect_error);
    }
    else{
        if($password != $confirm_password){
            echo "Passwords do not match";
        }else{
            $sql = $conn->prepare("INSERT INTO " + $table + "(Username, Password) VALUES(?, ?)");
            $sql->blind_param("ss", $username, $password);
            $sql->execute();
            echo "User created! You can now log in.";
            $sql->close();
        }
    }
    mysqli_close($conn);
?>