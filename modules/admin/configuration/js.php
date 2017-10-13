<?php

$PATH = "../../";
$js = [
	[
		"file" 	=> "{$PATH}_js/_sgQuery.js",
		"begin"	=> false],
	[
		"file" 	=> "{$PATH}js/sgAjax.js",
		"begin"	=> false],
	[
		"file" 	=> "{$PATH}js/drag.js",
		"begin"	=> false],
	
	
	
];
echo 4;
Sevian\S::jsInit($js);

$jsFiles[] = array("file" => "{$PATH}_js/_sgQuery.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/sgAjax.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/drag.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/sgWindow.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/sgDB.js", "begin" => true);
$jsFiles[] = array("file" => "{$PATH}js/sgInit.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/sgSevian.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/Sevian/Tab.js", "begin" => false);

$jsFiles[] = array("file" => "{$PATH}js/Sevian/Menu.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/Sevian/DesignMenu.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/Sevian/Upload.js", "begin" => false);

$jsFiles[] = array("file" => "{$PATH}js/sgCalendar.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/Sevian/Input.js", "begin" => false);
$jsFiles[] = array("file" => "{$PATH}js/Sevian/Form.js", "begin" => false);
?>