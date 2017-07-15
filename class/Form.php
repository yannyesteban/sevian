<?php

namespace Sevian;



class Page extends HTML{
	
	public $tagName = "section";
	public $caption = false;
	public $body = false;
	
	private $_caption = false;
	
	public function __construct	($opt = false){
		
		if(is_array($opt)){
			foreach($opt as $k => $v){
				$this->$k = $v;	
			}// next			
		}// end if			
		
		if($this->caption){
			$this->setCaption($this->caption);
		}

		$this->{"data-page-type"} = "main";
		
		$this->body = new HTML("div");
		$this->body->{"data-page-type"} = "body";
		$this->body->class = "body";
		HTML::appendChild($this->body);
		
	}// end fucntion
	
	public function setCaption($caption){
		
		if(!$this->_caption){
			$this->_caption = new HTML("header");
			$this->_caption->{"data-page-type"} = "caption";
			$this->_caption->class = "caption";
			
			HTML::insertFirst($this->_caption);
		}
		
		$this->_caption->innerHTML = $caption;
		return $this->_caption;
		
	}// end fucntion
	
	public function getCaption(){
		return $this->_caption;
	}// end fucntion
	
	public function getBody(){
		return $this->_caption;
	}// end fucntion
	
	public function appendChild($e){
		return $this->body->appendChild($e);
	}// end fucntion

}// end class



class Tab{
	
	
	public $name ="";

	public $_main = false;
	public $_menu = false;
	public $_body = false;

	public $nTab = 0;
	public $class = "";
	
	public $value = 0;
	
	public $css = "";
	public $tab = array();
	public $body = array();
	private $_ref = "tab";
	
	public function __construct($name, $class = false) {
		

		$this->name = $name;
		$this->_main = new HTML("div");
		$this->_menu = new HTML("div");
		$this->_body = new HTML("div");
		
		$this->_main->id = $this->name;
		$this->_menu->id = $this->name."_menu";
		$this->_body->id = $this->name."_body";
		$this->_main->appendChild("\n");
		$this->_main->appendChild($this->_menu);
		$this->_main->appendChild("\n");
		$this->_main->appendChild($this->_body);
		$this->_main->appendChild("\n");
		
		$this->_main->{"data-tab-type"} = "main";
		
		$this->_main->class = "sg-tab-main";
		$this->_menu->class = "sg-tab-menu";
		$this->_body->class = "sg-tab-body";
		if($class !== false){
			//$this->setClass($class);
		
		}// end if
		
	
	}// end function
	
	public function setClass($class = ""){
		$this->_main->class = $class;
		
	}	
	
	public function setRef($name){
		$this->_ref = $name;	
	}// end function
	public function getRef(){
		return $this->_ref;	
	}// end function
	public function add($title = "", $body = false){
		
		
		$this->tab[$this->nTab] = new HTML("a");
		$this->tab[$this->nTab]->appendChild($title);
		$this->tab[$this->nTab]->href = "javascript:void(0);";
		$this->tab[$this->nTab]->class = "sg-tab-imenu";
		
		
		$this->body[$this->nTab] = new HTML("div");
		$this->body[$this->nTab]->id = $this->name."_body_".$this->nTab;
		$this->body[$this->nTab]->class = "sg-tab-ibody";
		if($body){
			$this->body[$this->nTab]->appendChild($body);
		}// end if

		$this->_menu->appendChild("\n\t");
		$this->_body->appendChild("\n");

		$this->_menu->appendChild($this->tab[$this->nTab]);
		$this->_body->appendChild($this->body[$this->nTab]);

		return $this->body[$this->nTab++];
		
	}// end function
	
	
	public function getIMenu($index){
		if(isset($this->tab[$index])){
			return $this->tab[$index];
		}else{
			return false;
		}
		
		
	}
	public function getIBody($index){
		if(isset($this->body[$index])){
			return $this->body[$index];
		}else{
			return false;
		}
		
	}
	
	public function getRequest(){
		
		$info = new \stdClass;
		$info->classObject = "sgTab";
		
		
		$info->menuId = "{$this->name}_menu";
		$info->bodyId = "{$this->name}_body";
		$info->value = $this->value;
		$info->classObject = "sgTab";
		
		return $info;
		
	}
	
	
	public function getScript(){
		
		$ref = $this->getRef();
		if(!$ref = $this->getRef()){
			//$ref = $this->name;	
		}
		
		
		
		$j = array(
			
			"menuId" => "{$this->name}_menu",
			"bodyId" => "{$this->name}_body",
			"value"	 => 1,
		);
		$json = json_encode($j);
		
		$script = "sgTab.load($json);";
		//$script = "\n\t$ref = _sgTab.create({menu:'".$this->_menu->id."', body:'".$this->_body->id."'});";		
		return $script;
		
	}
	
	public function funcShow($index){
		$ref = $this->getRef();
		return "$ref.show($index);";
	}
	
	public function render(){
		

		return $this->_main->render();
		
		
	}// end function
	
	
}// end class

class Form{
	
	
	
}




?>