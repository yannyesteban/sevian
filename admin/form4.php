<?php


class FileUp{
	
	public $field = "";
	public $rename = false;
	public $path = "";
	public $error = false;
	
	
	public function delete($name){
		unlink($this->path.$this->name);
		
		
		
	}
	
	public function upload($name){
		
		
	}
	
	public function load(){
		if($_FILES[$this->field]["name"] == ""){
			return false;
		}
		$file = $_FILES[$this->field]["name"];
		
		$info = pathinfo($file);
		
		$ext = $info['extension'];
		//echo $this->path.$this->field.$ext;
		
		
		
		$baseNamme = uniqid("f");
		
		$name = $this->path.$baseNamme.".".$ext;
		
		move_uploaded_file($_FILES[$this->field]["tmp_name"],$name);
		
		return ;
		
		$info = pathinfo($file);
		

		
		$this->ext = "";

		if(preg_match("/(.\w+)$/", $this->archivo_name, $c)){
			$this->ext = $c[1];
		}// end if


		if($this->nombre==""){
			$rand = substr((rand (0,9999)*10000),0,4);
			$aux = date("YmdHis")."_".$rand;	
			$this->nombre = $aux.$this->ext;
		}else{
			$archivo_x = pathinfo($this->nombre);
			$this->nombre = $archivo_x["dirname"]."/".$archivo_x["filename"].$this->ext;

		}// end if
	
		if ($this->archivo_name == "" or move_uploaded_file($_FILES[$this->nombre_ele]["tmp_name"],$this->path.$this->nombre)){
	
			return $this->nombre;
		}else{
			
			$this->msg_error = C_ERROR_UPLOAD;
			return false;
		}// end if		
		
	}
	
	
	
	
	
	
}


class form4 extends Sevian\Panel{
	
	
	public function evalMethod($method=""){
		
		
		$f = new FileUp();
		
		$f->field = "archivo";
		$f->path = "files/";
		
		$f->name = "x.jpg";
		
		echo $method;
		
		
		$f->delete();
		$f->load();
		
	}
	
	
	public function render(){
		
		echo $this->method;
		
		$main = new Sevian\HTML("div");
		
		$main->class = "xxx";
		$main->text = "hola";
		
		
		$input = $main->add("input");
		$input->type = "file";
		$input->name = "archivo";
		
		
		$input2 = $main->add("input");
		$input2->type = "button";
		
		
		$action = Sevian\Action::Send([
			"async"=>true,
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