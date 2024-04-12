<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $host = "localhost";
    $name = "tainga_";
    $pwd = "pants_#Data";
    $dbname = "tainga_PantsUsers";
    $table = "Users"

    $conn = new mysqli_connect($host, $name, $pwd, $dbname);
    if($conn ->connect_error) {
        die('Error : ' .$conn-> connect_error);
    }
    else{
        $sql = $conn->prepare("SELECT * FROM " + $table + " WHERE UserName=?");
        $sql->blind_param("s", $username);
        $sql->execute();
        // store result so we can check if the username exists in a later step
        $result = $sql->get_result();
        if(mysqli_num_rows($result) >  0){
            $data = $result-fetch_assoc();
            if($data['Password'] ===$password ){
                echo "Login  Successful!";
                // Redirect user to index.html
                header("Location: index.html");
                exit(); // Stop further execution
            }
            else{
                echo "Invalid Username or Password";
            }
        }else{
            echo "Invalid Username or Password";
        }

        $sql->close();
    }
    mysqli_close($conn);
?>
?>