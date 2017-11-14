<?php
namespace Sevian\Sigefor;

class InfoField{
	public $form = "";
	public $field = "";
	public $name = "";
	public $method = "";
	public $title = "";
	public $class = "";
	public $params = "";
	public $input = ["input"=>"text"];
	public $config = false;
	public $data = false;
	public $init_value = "";
	public $default = "";

	public $parent = false;
	public $childs = false;
	public $rules = false;
	public $value = "";

	public $info = false;
	
	public $mtype = false;
	public $key = false;
	public $serial = false;
	public $length = false;
	public $table = false;

	public function __construct($opt = []){
		
		foreach($opt as $k => $v){
			if(property_exists($this, $k)){
				$this->$k = $v;	
			}
		}
	}

	public function update($opt = []){
		self::__construct($opt);
	}

}

class Form extends \Sevian\Panel{
	public $form = false;
	public $title = false;
	public $class = false;
	public $query = '';
	public $params = '';
	public $tabs = '';
	public $pages = '';


	public $jsonFile = 'form.json';
	
	
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
		
		
		//$this->loadForm();
		$this->load();
		
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
		
		$cn = $this->cn;

		$cn->query = "SELECT * FROM _sg_forms WHERE form = '$this->name'";
		
		$result = $cn->execute();
		
		
		if($rs = $cn->getDataAssoc($result)){

			foreach($rs as $k => $v){
				$this->$k = $v;
			}
			
		}

		$info = $this->getInfoFields($this->query);

		$fields = $info->fields;

		foreach($fields as $k => $v){
			$this->fields[$k] = new \Sevian\Sigefor\InfoField($v);
		}

		$q = "SELECT * FROM _sg_form_fields WHERE form = '$this->name'";

		$result = $cn->execute($q);

		while($rs = $cn->getDataAssoc($result)){
			if(isset($this->fields[$rs["field"]])){
				$this->fields[$rs["field"]]->update($rs);
			}
			
		
		}

		//print_r($this->fields);
		
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
		$f->setCaption($this->title."...");
		
		foreach($this->fields as $k => $field){
			

			$field->caption = $field->name;
			$f->addField($field);
			
		}
		
		
		return $f;
	}
	
	
}




?>