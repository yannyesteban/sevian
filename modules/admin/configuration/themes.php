<?php

$themes = [
	'sevian' => [
		'css' => [
			'../themes/sevian/css/Sevian.css',
			//'Main.css',
			//'Window.css',
			//'Menu.css',
			//'Calendar.css',
			//'Tab.css',
			//'Ajax.css',
			//'SelectText.css',
			//'Form.css'
			],
		'js' => [
			'uno.js'],
		'templates'	=> [
			'main'	=> '../themes/sevian/html/main.html',
			'main2'	=> '../themes/sevian/html/main2.html',
			'main3'	=> '../themes/sevian/html/main3.php',
			'main4'	=> '../themes/sevian/html/main4.php']]
	
	
];
	



Sevian\S::themesLoad($cls_elements);


?>