<?php
/*****************************************************************
creado: 19/12/2015
por: Yanny Nu�ez
Version: 1.0

creado: 10/08/2017
por: Yanny Nu�ez
Version: 2.0
*****************************************************************/
namespace Sevian;

class Document{
	public $type = "html";
	public $charset = "utf-8";
	public $doctype = "<!DOCTYPE HTML>";
	public $content_type = "text/html; charset=";
	
	public $head = false;
	public $body = false;
	public $title = "";
	
	private $style = false;
	private $script = false;
	
	private $_meta = false;
	private $_style = false;
	private $_script = false;
	
	private $scriptDocEnd = false;
	private $scriptEnd = false;
	
	public function __construct($type = "html"){
		$this->type = $type;
		switch ($this->type){
			case "html":
				
				$this->_meta = new HTML("");
				$this->_style = new HTML("");
				$this->_script = new HTML("");

				$this->head = new HTML("head");
				$this->head->appendChild($this->_meta);
				$this->head->appendChild("\n");
				$this->head->appendChild($this->title = new HTML("title"));
				$this->head->appendChild("\n");

				$this->body = new HTML("body");
				
				$this->scriptDocEnd = new HTML("");
				$this->scriptEnd = new HTML("script");
				
				break;
			case "xml":
				$this->xml = new HTML("");
				break;
			case "json":
				break;
			case "script":
				break;
		}
	}
	
	public function setTitle($title){
		$this->title->innerHTML = $title;
	}

	public function addMeta($meta){
		$this->_meta->appendChild("\n");
		$this->_meta->appendChild($meta);
	}
	
	public function appendCssSheet($sheet){
		$link = new HTML("link");
		$link->href = $sheet;
		$link->rel = "stylesheet";
		$link->type = "text/css";
		$this->head->appendChild($link);
		$this->head->appendChild("\n");
	}
	
	public function appendCssStyle($css=""){
		if(trim($css) != ""){
			if(!$this->style){
				$this->style = new HTML("style");
			}
			$this->style->appendChild("\n".$css."\n");
		}
	}
	
	public function appendScriptDoc($src, $toEnd = false){
		$doc = new HTML("script");
		$doc->src = $src;		
		if(!$toEnd){
			$this->head->appendChild($doc);
			$this->head->appendChild("\n");			
		}else{
			$this->scriptDocEnd->appendChild($doc);
			$this->scriptDocEnd->appendChild("\n");		
		}
	}// end function

	public function appendScript($code, $toEnd = false){
		if(!$this->script){
			$this->script = new HTML("script");
		}
		if(!$toEnd){
			$this->script->appendChild($code."\n");
		}else{
			$this->scriptEnd->appendChild($code."\n");
		}
	}
	
	public function render(){
		switch($this->type){
			case "html":
				if($this->content_type!=""){
					//$meta = new HTML("meta")
					//$meta->setAttribute("http-equiv","Content-Type");
					//$meta->content = $this->content_type.$this->charset;
				}

				$html = new HTML("html");

				$body = $this->body->render();
				
				$this->appendCssStyle($this->body->getCss());
				$this->appendScript($this->body->getScript(), true);
				
				$this->head->appendChild($this->style);
				$this->head->appendChild("\n");
				$this->head->appendChild($this->script);
				
				$html->appendChild("\n");
				$html->appendChild($this->head);
				$html->appendChild("\n");
				$html->appendChild($body);
				$html->appendChild("\n");
				$html->appendChild($this->scriptDocEnd);
				
				$html->appendChild($this->scriptEnd);
				$html->appendChild("\n");

				return $this->doctype."\n".$html->render();
				break;
			case "xml":
				$this->doctype = "<?xml version=\"1.0\" encoding=\"$this->charset\"?>";
				$doc = $this->doctype;
				$doc .= "\n".$this->xml->render();
				return $doc;		
				break;	
		}// end switch
	}// end function	
	
}// end class
?>