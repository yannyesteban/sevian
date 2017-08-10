<?php

namespace Sigefor;

use Sevian;

class Fragment extends Sevian\Panel{
	
	private $cn_name = "_default";
	
	public function __constructx($opt){
		
		
		Sevian\Panel::__construct($opt);
		
		
	}
	
	
	public function execute(){
		
		global $sevian;
		
		$cn = Sevian\Connection::get("sevian_2017");
		$t_fragments = "_sg_fragments";
		
		//$cn = &$this->cn;
		$cn->query = "
			SELECT * 
			FROM $t_fragments 
			WHERE fragment = '$this->name'";
		
		
		
		$result = $cn->execute($cn->query);
		if($rs = $cn->getDataAssoc($result)){
			
			foreach($rs as $k => $v){
				$this->$k = $v;
			}
			
			
		}else{


			
		}// end if
		
		
		$this->html = $sevian->vars($this->html);
		
		
		
		
	}
	
	public function render(){
		
		$this->execute();
		return $this->html;
		
	}
	
	
	
}


?>