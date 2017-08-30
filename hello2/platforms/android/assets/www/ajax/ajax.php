<?php 
    $result = array();
    $callback = $_GET['callback'];
    $myData = $_GET['myData'];
    $result = array('result' => $myData);
    echo $callback."(".json_encode($result).")";
?>