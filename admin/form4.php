<?php


class FileUp{
	
	public $field = "";
	public $name = false;
	public $path = "";
	public $error = false;
	
	public function delete($name=""){
		
		if(is_file($this->path.$this->name)){
			unlink($this->path.$this->name);
			return true;
		}else{
			return false;
		}
		
	}
	
	public function upload($name){
		
		foreach ($_FILES["pictures"]["error"] as $key => $error) {
			if ($error == UPLOAD_ERR_OK) {
				$tmp_name = $_FILES["pictures"]["tmp_name"][$key];
				// basename() puede evitar ataques de denegación de sistema de ficheros;
				// podría ser apropiada más validación/saneamiento del nombre del fichero
				$name = basename($_FILES["pictures"]["name"][$key]);
				move_uploaded_file($tmp_name, "$uploads_dir/$name");
			}
		}
	}
	
	public function load(){
		print_r($_FILES[$this->field]);
		foreach ($_FILES[$this->field]["error"] as $key => $error) {
			if ($error == UPLOAD_ERR_OK) {
				$tmp_name = $_FILES[$this->field]["tmp_name"][$key];
				// basename() puede evitar ataques de denegación de sistema de ficheros;
				// podría ser apropiada más validación/saneamiento del nombre del fichero
				$name = basename($_FILES[$this->field]["name"][$key]);
				echo $name."\n";
				
				//move_uploaded_file($tmp_name, "$uploads_dir/$name");
			}
		}
		
		if($_FILES[$this->field]["name"] == ""){
			$this->error = true;
			return false;
		}
		
		$file = $_FILES[$this->field]["name"];
		
		$info = pathinfo($file);
		$ext = $info['extension'];
		
		if($this->name){
			$baseName = $this->name;
		}else{
			$baseName = uniqid("f");
		}

		
		$name = $this->path.$baseName.".".$ext;
		
		if(move_uploaded_file($_FILES[$this->field]["tmp_name"], $name)){
			return $name;
			
		}else{
			$this->error = true;
			return false;
		}
	
		
	}
	
	
	
	
	
	
}


class form4 extends Sevian\Panel{
	
	
	public function evalMethod($method=""){
		
		
		$f = new FileUp();
		
		$f->field = "archivo";
		$f->path = "files/";
		
		//$f->name = "esteban";
		
		//echo $method;
		
		
		//$f->delete();
		$f->load();
		
	}
	
	
	public function render(){
		
		
		
		$main = new Sevian\HTML("div");
		
		$main->class = "xxx";
		$main->text = "hola";
		
		
		$input = $main->add("input");
		$input->type = "file";
		
		$input->multiple = "multiple";
		$input->name = "archivo";
		
		
		$input2 = $main->add("input");
		$input2->type = "button";
		
		
		$action = Sevian\Action::Send([
			"async"=>false,
			"panel"=>6,
			"valid"=>false,
			"params"=>[
			[
					"setMethod"=>[
						"panel"=>4,
						"element"=>"form4",
						"name"=>"uno",
						"method"=>"save",
					],
			
			
					
				],
				[
					
			
					"setPanel"=>[
						"panel"=>4,
						"element"=>"form4",
						"name"=>"uno",
						"method"=>"load",
					],
				]
				
			]
			
		]);
		
		$input2->onclick = $action;
		
		return $main->render();
	}
	
}
	
?>