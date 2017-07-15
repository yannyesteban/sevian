<?php
namespace Sevian\Sigefor;


class Form extends \Sevian\Panel{
	
	
	
	public function render(){
		
		
		$page = new \Sevian\Page();
		
		$page->setCaption("Mi Página");
		
		$div = new \Sevian\HTML("div");
		
		$div->id = "x1";
		
		$div->innerHTML = "Principal";
		
		$page->appendChild($div);
		
		
		$tab = new \Sevian\Tab("xx");
		
		$tab->setClass("sg-tab-main");
		
		$tab->add("Uno","Hola a Todos");
		$tab->add("Dos","Bye a Todos");
		
		$t = new \Sevian\Table(4);
		$t->border = "4px";
		
		$r = $t->insertRow();
		
		$r->cells[0]->text = "uno";
		$r->cells[1]->text = "Dos";
		$r->cells[2]->text = "Tres";
		$r->cells[3]->text = "Cuatro";
		
		$r = $t->insertRow();
		
		$r->cells[0]->text = "Cinco";
		$r->cells[1]->text = "Seis";
		$r->cells[2]->text = "Siete";
		$r->cells[3]->text = "Ocho";
		
		$tab->add("Tres")->appendChild($t);
		
		$tab->getIBody(0)->text .= "  H85";
		
		$j = [
			
			"menuId" => "xx_menu",
			"bodyId" => "xx_body",
			"value"=>1,
		];
		$json = json_encode($j);
		$this->script .= $tab->getScript();
		//$this->script = "sgTab.load($json);";
		//$this->script = "var tab = new sgTab();tab.loadFrom('xx_menu', 'xx_body');sgTab.load(12474737);";
		
		return "SG: ".$page->render().$tab->render();
		
	}
	
	
	
	
}




?>