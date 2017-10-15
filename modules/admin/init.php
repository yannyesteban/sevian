<?php


$structure = [
	
	"name"=>"ne",
	"templates"=>"main1",
	
	
];


$init = [
	'theme'=>'sevian',
	'templateName' => 'main3',
	'elements' => [
		[
			'panel'		=> 4,
			'element'	=> 'FormC',
			'name'		=> 'uno',
			'method'	=> 'toolbar',
			'designMode'=> false,
			'fixed'		=> true,
		],
		[
			'panel'		=> 6,
			'element'	=> 'FormC',
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