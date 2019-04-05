<?php
$PATH = '../../themes/';
$themes = [
	'sevian' => [
		'css' => [
			//$PATH.'sevian/css/Sevian.css',
			$PATH.'sevian/css/cota.css',
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
			'main'	=> $PATH.'sevian/html/main.html',
			'main2'	=> $PATH.'sevian/html/main2.html',
			'main3'	=> $PATH.'sevian/html/main3.php',
			'main4'	=> $PATH.'sevian/html/main4.php',
			'cota'	=> $PATH.'sevian/html/main_cota.php',
			'cota_login'	=> $PATH.'sevian/html/cota_login.html',
			
			]]
	
	
];

Sevian\S::themesLoad($themes);


?>