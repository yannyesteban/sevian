<?php



class Menu1 extends Sevian\Panel{
	
	
	
	public function render(){
		
		$menu = new Sevian\Menu([
			"id"=>"menu22",
			"caption"=>"Menú Secundario",
			"type"=>"default",
			//"pullDeltaX"=>15
			
			
		]);
		
		$menu->add([
			"id"=>0,
			"parentId"=>false,
			"caption"=>"Option 1",
			"action"=>"alert(1);",
			"events"=>[
				"click"=>"alert(2);"

			]
			
		]);
		$menu->add([
			"id"=>1,
			"parentId"=>false,
			"caption"=>"Option 2"
		]);
		$menu->add([
			"id"=>2,
			"parentId"=>false,
			"caption"=>"Option 3"
		]);
		$menu->add([
			"id"=>3,
			"parentId"=>false,
			"caption"=>"Option 4"
		]);
		
		$menu->add([
			"id"=>4,
			"parentId"=>3,
			"caption"=>"Option 41"
		]);
		$menu->add([
			"id"=>5,
			"parentId"=>3,
			"caption"=>"Option 42"
		]);

		$menu->add([
			"id"=>6,
			"parentId"=>3,
			"caption"=>"Option 43"
		]);
		$this->html = $menu->render();
		
		$this->script = $menu->getScript();
		
		$btn = new Sevian\HTML("input");
		$btn->type = "button";
		$btn->value = "OK";
		$btn->onclick = "menu.setCaption('Menu X1000')";
		
		
		
		return $this->html.$btn->render();
		
	}
	
	
}


?>