<?php
namespace Sevian;


class mMenu extends Panel{
	
	
	
	public function render(){
		
		$this->_main = ["type"=>"mMenu","name"=>"bicicleta","title"=>"Bélgica"];
		s::setMainPanel($this->panel, "mMenu", $this->getMain());
		return "NOOOOO !!!";
	}
	
	
	public function _getScript(){
		return "alert(888);";
	}
	
	public function _getCss(){
		
		return "body{color:aqua!important}";
	}
	
}




?>