<?php





class FormB extends Sevian\Panel{
	
	
	public function evalMethod($method=""){
		
		
		
		
	}
	
	
	public function render(){
		
		$opt = [
			"caption"=>"Hola"
			
			
		];
		$form = new Sevian\Form($opt);
		
		
		return $form->render();
	}
	
}
	
?>