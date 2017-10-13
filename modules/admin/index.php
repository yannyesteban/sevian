<?php

include '../../class/_sevian.php';
include 'configuration/bd.php';
include 'configuration/inputs.php';
include 'configuration/elements.php';
include 'configuration/themes.php';
include 'configuration/commands.php';
include 'init.php';



echo Sevian\S::render();
?>