<?php



class DesignMenu extends Sevian\Panel{
	
	
	
	public function render(){
		
		
		$action = Sevian\Action::Send([
			"async"=>true,
			"panel"=>4,
			"valid"=>false,
			"params"=>[
				[
					"setPanel"=>[
						"panel"=>4,
						"element"=>"menu",
						"name"=>"uno",
						"method"=>"load",
					],
				]
				
			]
			
		]);
		
		
		$div = new Sevian\HTML("div");
		$div->id = "design";
		$div->class = "design";
		$div2 = new Sevian\HTML("div");
		$div2->id = "design2";
		$div2->class = "design";
		//$div->innerHTML = "HOLA";
		
		$this->script = "loadMenu();";
		
		return $div->render().$div2->render();
		
	}
	
	
}


?>