<?php

$conections = [];
$elements = [];
$themes = [];
$clsInput = [];
$clsElement = [];
$commands = [];
$sequence_init = [];
$sequence = [];
$listen = [];
$actions = [];

$themes["sevian"] = [
	"css"		=> [
		"../themes/sevian/css/Sevian.css",
		"Main.css",
		"Window.css",
		"Menu.css",
		"Calendar.css",
		"Tab.css",
		"Ajax.css",
		"SelectText.css",
		"Form.css"
	],
	"js"		=> [
		"uno.js"
	],
	"templates"	=> [
		"main"	=> "../themes/sevian/html/main.html",
		"main2"	=> "../themes/sevian/html/main2.html",
		"main3"	=> "../themes/sevian/html/main3.php",
	]
];

$clsInput["submit"] = [
	"file" 	=> "sgInput.php",	
	"css" 	=> "",	
	"js" 	=> "",	
	"class" => "stdInput",
	"type"  =>  "submit"];
$clsElement["form"] = [
	"file" 	=> "SgForm.php",
	"class" => "SgForm"];
$clsElement["menu"] = [
	"file" 	=> "SgMenu.php",
	"class" => "SgMenu"];
$clsElement["fragment"] = [
	"file" 	=> "ssFragment.php",
	"class" => "ssFragment"];
$clsElement["procedure"] = [
	"file" 	=> "SsProcedure.php",
	"class"	=> "SsProcedure"];
$clsElement["sgForm"] = [
	"file" 	=> "Sigefor/Form.php",
	"class" => "Sevian\Sigefor\Form"];

$commands["procedure"] = [
	"element"	=>	"procedure",
	"property"	=>	"name",
	"method"	=>	"init",
	"name"		=>	false,
	"eparams"	=>	false
];

$PATH = SS_PATH;

$cssSheets = array(
	
	"{$PATH}css/sgMenu.css",
	"{$PATH}css/sgWindow.css",
	"{$PATH}css/sgCalendar.css",
	"{$PATH}css/selectText.css",
	"{$PATH}css/sgTab.css",
	"{$PATH}css/sgAjax.css",
	"{$PATH}css/grid.css"

);

$jsFiles[] = array("file" => "{$PATH}_js/_sgQuery.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgAjax.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/drag.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgWindow.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgDB.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgInit.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgSevian.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgTab.js", "begin" => true);

?>