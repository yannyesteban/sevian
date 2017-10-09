<?php





class FormB extends Sevian\Panel{
	
	
	public function evalMethod($method=""){
		
		
		
		
	}
	
	
	public function render(){
		
		$opt = [
			"caption"=>"Hola"
			
			
		];
		$form = new Sevian\Form($opt);
		
		$form->addField([
			"caption"=>"Cédula",
			"name"=>"cedula",
		"input"=>["input"=>"date", "id"=>"x", "name"=>"Nombre1","value"=>"1975-10-24", "className"=>"zelda"]]);
		/*
		$form->addField([
			"caption"=>"Cédula",
			"name"=>"cedula2",
		"input"=>["input"=>"date", "id"=>"x", "name"=>"u","value"=>"1975-10-24", "className"=>"zelda"]]);
		
		$form->addField([
			"caption"=>"Cédula",
			"name"=>"cedula3",
		"input"=>["input"=>"date", "id"=>"x", "name"=>"y","value"=>"1975-10-24", "className"=>"zelda"]]);
		
		
		$form->addField([
			"caption"=>"TipoFecha",
			"name"=>"tipo2",
		"input"=>["input"=>"date", "id"=>"x11", "name"=>"x11","value"=>"1975-10-24", "className"=>"zelda", [
			
			[1, "yanny"],
			[2, "esteban"],
			[3, "nuñez"],
			
		]]]);
		*/
		$html = $form->render();
		
		$this->script = $form->getScript();
		
		return $html;
		global $sevian;
		$g = $sevian->sgInput(["input"=>"date", "id"=>"x", "name"=>"Nombre1","value"=>"1975-10-24", "className"=>"zelda"]);
		
		$i = $sevian->sgInput(["input"=>"date", "id"=>"cedula", "name"=>"cedula", "className"=>"wolfs", "value"=>2,
							  
							  "propertys"=>["placeholder"=>"seleccione..."],
							   
							   
							   "events"=>["click"=>"alert(this.getValue())"]
							  ]);
		
		
		
		$i->data = [
			
			[1, "yanny"],
			[2, "esteban"],
			[3, "nuñez"],
			
		];
		
		$tab = new Sevian\Tab(["pages"=>[
			["title"=>"caja"],
			["title"=>"lider"]
			
		]]);
		
		$tab->add(["title"=>"Nuevo", "child"=>"Ja nnn"]);
		$tab->add(["title"=>"Opciones", "child"=>"Ok"]);
		$tab->add(["title"=>"Config", "child"=>"Cool"]);
		
		
		$fs = new Sevian\FieldSet(["caption"=>"hola"]);
		
		$ii = new Sevian\HTML("input");
		$ii->type = "text";
		$fs->appendChild($ii);
		
		$html = $i->render().$g->render().$form->render().$tab->render().$fs->render();
		
		
		
		$this->script = $i->getScript().$g->getScript().$tab->getScript();
		
		//echo(json_encode($tab, JSON_PRETTY_PRINT));
		
		/*
		
		$ff = new Sevian\Form([]);
		
		
		$ff->setCaption("");
		
		$ff->addPage("");
		$ff->addTab("");
		$ff->addTabPage();
		
		$ff->addField();
		
		$ff->addInput();
		$ff->addMenu();
		*/
		
		return $html;
	}
	
}
	
?>