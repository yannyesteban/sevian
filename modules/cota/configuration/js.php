<?php

$PATH = "../../";

$js = [
	[
		'file' 	=> "{$PATH}_js/_sgQuery.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/sgAjax.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/drag.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/sgWindow.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/sgDB.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/sgInit.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/sgSevian.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/Sevian/Tab.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/Sevian/Menu.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/Sevian/DesignMenu.js",
		'toEnd'	=> false],
	/*[
		'file' 	=> "{$PATH}js/Sevian/Upload.js",
		'toEnd'	=> false],*/
	[
		'file' 	=> "{$PATH}js/sgCalendar.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/Sevian/Input.js",
		'toEnd'	=> false],
	[
		'file' 	=> "{$PATH}js/Sevian/Form.js",
		'toEnd'	=> false],

	[
		'file' 	=> "https://code.jquery.com/jquery-3.3.1.slim.min.js",
		'toEnd'	=> true],		

	[
		'file' 	=> "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
		'toEnd'	=> true],		
	[
		'file' 	=> "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
		'toEnd'	=> true],		

	[
		'file' 	=> "{$PATH}js/Sevian/cota.js",
		'toEnd'	=> true],

	
];

Sevian\S::jsInit($js);

?>