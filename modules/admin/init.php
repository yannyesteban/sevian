<?php


$structure = [
	
	"name"=>"ne",
	"templates"=>"main3",
	
	
];


$init = [
	'theme'=>'sevian',
	'title'=>'Sigefor 1.0',
	'templateName' => 'main3',
	'elements' => [
		[
			'panel'		=> 4,
			'element'	=> 'ImagesDir',
			'name'		=> 'uno',
			'method'	=> 'toolbar',
			'designMode'=> false,
			'fixed'		=> true,
		],
		[
			'panel'		=> 6,
			'element'	=> 'ImagesDir',
			'name'		=> 'dos',
			'method'	=> 'toolbar',
			'designMode'=> false,
			'fixed'		=> true,
		],
	
	],
	
	'sequences' => [
	
	
	
	],
	'actions' => [
	
	
	
	],
	
	'css' => [],
	
	'js' => [],
	
];

Sevian\S::configInit($init);

?>