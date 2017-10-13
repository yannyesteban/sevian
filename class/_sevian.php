<?php
namespace Sevian;
include 'Connection.php';
include 'HTML.php';
include 'Document.php';
include 'Structure.php';

class S{
	public static $cfg = [];
	
	public static $ses = [];
	public static $req = [];
	public static $exp = [];
	
	private static $ins = false;
	private static $onAjax = false;
	
	public static $_js = [];
	private static $_css = [];
	
	public static function setSes($key, $value){
		self::$ses[$key] = $value;
	}
	public static function setReq($key, $value){
		self::$req[$key] = $value;
	}
	public static function setExp($key, $value){
		self::$exp[$key] = $value;
	}
	public static function &getSes($key){
		return self::$ses[$key];
	}
	public static function &getReq($key){
		return self::$req[$key];
	}
	public static function &getExp($key){
		return self::$exp[$key];
	}
	public static function &getVSes(){
		return self::$ses;
	}
	public static function &getVReq(){
		return self::$req;
	}
	public static function &getVExp(){
		return self::$exp;
	}
	public static function jsInit($js = []){
		self::$_js = $js;
	}
	public static function cssInit($css = []){
		self::$_css = $css;
	}
	public static function configInit($opt = []){
		
	}
	public static function sessionInit(){
		
		
		$ins = false;
		
		if(isset($_REQUEST['__sg_ins'])){
			$ins = $_REQUEST['__sg_ins'];
		}else{
			$ins = uniqid('p');
		}
		
		self::$ins = $ins;

		session_name($ins);
		session_start();
		
		self::$cfg = &$_SESSION;
		self::$req = &$_REQUEST;
		
		self::$ses = &self::$cfg['VSES'];
		self::$onAjax = self::getReq('__sg_async');
		
		
	}
	public static function init($opt = []){
		
	}
	public static function inputsLoad($inputs){
		
	}
	public static function elementsLoad($inputs){
		
	}
	public static function themesLoad($inputs){
		
	}
	public static function commandsLoad($inputs){
		
	}
	private static function htmlDoc(){
		global $sevian;
		
		
		$doc = new Document();
		/*
		$meta1 = new HTML('meta');
		$meta1->{'http-equiv'} = 'Content-Type';
		$meta1->content = 'text/html; charset=utf-8';

		$meta2 = new HTML('meta');
		$meta2->name = 'viewport';
		$meta2->content = 'width=device-width, initial-scale=1';
		
		$doc->addMeta($meta1);
		$doc->addMeta($meta2);
		*/

		$doc->setTitle('Sevian 2018');
		
		foreach(self::$_css as $v){
			$doc->appendCssSheet($v);
		}
		
		
		foreach(self::$_js as $k=> $v){
			
			$doc->appendScriptDoc($v['file'], true);
		}
		
		
		return $doc->render();
		
		foreach($this->cssSheetsDefault as $v){
			$doc->appendCssSheet($v);
		}
		
		if(isset($this->themes[$this->theme])){
			foreach($this->themes[$this->theme]['css'] as $v){
				//$doc->appendCssSheet($this->themes[$this->theme]['path_css'].$v);
				$doc->appendCssSheet($v);
			}
			foreach($this->themes[$this->theme]['templates'] as $k => $v){
				//$this->_templates[$k] = $this->themes[$this->theme]['path_html'].$v;
				$this->_templates[$k] = $v;
			}
		}
		
		foreach($this->cssSheets as $v){
			$doc->appendCssSheet($v);
		}
		
		foreach($this->jsFilesDefault as $v){
			$doc->appendScriptDoc($v['file'], $v['begin']);//
		}
		
		foreach($this->jsFiles as $v){
			$doc->appendScriptDoc($v, true);
		}
		if(!$sevian->getTemplate()){
			if($this->templateName and isset($this->_templates[$this->templateName])){
				$this->template = file_get_contents($this->_templates[$this->templateName]);
			}
			$sevian->setTemplate($this->template);
		}
		
		
		$doc->body->add($sevian->evalTemplate());
		
		$doc->appendScript($sevian->script, true);
		
		$doc->setTitle($sevian->title);
		
		return $doc->render();
	}
	public static function render(){
		self::sessionInit();
		self::init();
		
		
		return self::htmlDoc();
	}
}



