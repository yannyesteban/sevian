<?php

namespace Sevian;

class Page{
    public $tagName = "section";
    public $caption = false;

    public $_caption = false;
    public function __construct($opt = []){

        if($this->caption !== false){

            $this->setcaption($this->caption);
        }

    }


    public function setCaption($caption){
		
		if(!$this->_caption){
			$this->_caption = new HTML("header");
			$this->_caption->{$this->getDataType()} = "caption";
			$this->_caption->class = "caption";
			
			HTML::insertFirst($this->_caption);
		}
		
		$this->_caption->innerHTML = $caption;
		return $this->_caption;
		
	}

    public function addSection(){

        $section = new HTML("div");
        $this->_section = $section;

    }

    public function addNav($opt){

        $nav = new HTML("nav");
        HTML:appendChild($nav);
    } 

}





?>