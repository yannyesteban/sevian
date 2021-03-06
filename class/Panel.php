<?php
namespace Sevian;

class Panel{
	
	static $_element = false;
	
	public $panel = false;
	public $element = "default";
	public $name = "";
	public $method = "";
	public $eparams = array();

	public $typePanel = "normal";
	public $async = false;
	public $updated = false;
	public $title = "";
	

	public $html = "";
	public $script = "";
	public $css = "";
	
	private $onDesing = true;
	private $onDebug = true;
	
	private $winParams = false;
	
	private $_signs = false;
	private $_infoRequest = false;
	
	public $_vconfig = array(
		"__sg_panel"	=>"__sg_panel",
		"__sg_sw"		=>"__sg_sw",
		"__sg_ins"		=>"__sg_ins",
		"__sg_params"	=>"__sg_params");
	
	
	
	
	static function setElementType(){
		
	}
	
	public function __construct($opt = array()){
		
		foreach($opt as $k => $v){
			$this->$k = $v;
		}
		
		
	}
	
	public function evalMethod($method = false){
		
	}
	
	public function extraMethod($method = false){
		
	}
	
	public function design(){
		
	}
	
	public function render(){
		
		return $this->html;
	}
	
	private function getInfoRequest(){
		
		$info = new \InfoRequest();
		
		$info->panel = $this->panel;
		$info->targetId = "";//$this->targetId;

		$info->html = $this->html;
		$info->script = $this->script;
		$info->css = $this->css;
		
		$info->title = $this->title;
		$info->typeAppend = 1;
		$info->hidden = false;
		$info->window = false;
		
		return $info;
		
	}
	
	public function request($method=false){
		
		if($method === false){
			$method = $this->method;
		}
		
		$this->evalMethod($method);
		
		return $this->getInfoRequest();
		
	}
	
	public function getScript(){
		
		return $this->script;
		
		
		$opt = new \stdClass;
		
		$opt->panel = $this->panel; 
		$opt->title = $this->title; 
		
		$json = json_encode($opt, JSON_PRETTY_PRINT);
		$this->script .= "sevian.setPanel($this->panel, false, $json);/*CAN*/";
		return $this->script; 
	}

	public function getCss(){
		return $this->css; 
	}

	public function getMain(){
		
		return $this->_main;
	}
	
	public function setJsonPanel($info){
		
		$this->_JsonPanel = $info;
	}
	
	public function getJsonPanel(){
		
		return $this->_JsonPanel;
		
		$opt = new stdClass;
		$opt->panel = $this->getElemType(); 
		$opt->panel = $this->panel; 
		$opt->title = $this->title; 
		
		return $opt; 
	}
	
	public function setVConfig($v){
		$this->_vconfig = $v;
	}
	
	public function setWinParams($params){
		$this->winParams = $params;
	}
	
	public function getWinParams(){
		return $this->winParams;
	}
	
	public function addSing($sign){
		return $this->_signs[] = $sign;
	}
	public function setSings($signs){
		$this->_signs = $signs;
	}
	
	public function getSings(){
		return $this->_signs;
	}
	
	public function configInputs(){
		return new sgHTML("");
		$div = new sgHTML("");
		
		foreach($this->_vconfig as $k => $v){
			$input = $div->add(array(
				"tagName"	=>	"input",
				"type"		=>	"text",
				"name"		=>	$k,
				"value"		=>	$v
			));
		}
	
		return $div;
	}
}
?>