<?php
namespace Sevian\Sigefor;


class Form extends \Sevian\Panel{
	
	public $jsonFile = "form.json";
	public $query = "";
	
	public $fields = [];
	
	
	private $main = false;
	
	public function __construct($opt = array()){
		
		foreach($opt as $k => $v){
			$this->$k = $v;
		}
		
		$this->main = new \Sevian\HTML("div");
		
		$this->cn = \Sevian\Connection::get();
	}
	
	
	public function evalMethod($method = ""){
		
		
		$this->loadForm();
		
		switch($method){
				
				
			case "request":
				$this->main = $this->form();
				break;
				
				
				
		}
		
	}
	
	private function getInfoFields($query){
		return $this->cn->infoQuery($query);
		
		
		
		
	}
	
	private function load(){
		
		$query = "SELECT * FROM _sg_forms WHERE form = '$this->name'";
		
		$result = $cn->execute();
		
		
		if($rs = $cn->getDataAssoc($result)){
			$titulo = $rs["title"];
		}
		
	}
	
	private function loadForm(){
		
		
		
		$_forms = json_decode(file_get_contents($this->jsonFile, true), true);
		
		$opt = $_forms[$this->name];
		
		foreach($opt as $k => $v){
			$this->$k = $v;
		}
		//echo $this->query;
		
		$this->infoFields = $this->getInfoFields($this->query);
		
		
		
		
	}
	
	public function render(){
		
		
		
		
		
		$this->evalMethod($this->method);
		
		
		return $this->main->render();
		
		
		
		
		
		
	}
	
	
	
	public function form(){
		
		$f = new \Sevian\Form();
		$f->setCaption($this->title);
		
		foreach($this->fields as $k => $v){
			$f->addField($v);
			
		}
		
		
		return $f;
	}
	
	
}




?>