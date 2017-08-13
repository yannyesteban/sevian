// JavaScript Document
if(!Sevian){
	var Sevian = {};
}
if(!Sevian.Input){
	Sevian.Input = {};
}
var sgDesignMenu = false;
(function(namespace, $){
	
	
	var Item = function(opt){
		this._target = false;
		this.caption = false;
		for(var x in opt){
			//if(opt.hasOwnProperty(x)){
				this[x] = opt[x];
			//}
			
		}
		
		this._target = $(this.target);
		this.create();
		
	};
	Item.prototype = {
		create: function(){
			
			
			this._main = this._target.create("div");
			
			this._main.text(this.caption).addClass("item");
			db(this.caption, "red")
		}	
		
		
	};
	
	
	var DesignMenu = function(opt){
		
		this.data = [];
		this.target = false;
		this.main = false;
		for(var x in opt){
			if(opt.hasOwnProperty(x)){
				this[x] = opt[x];
			}
			
		}
		this._target = $(this.target);
		this.create();
		
	};
	
	DesignMenu.prototype = {
		create: function(){
			this._main = this._target.create("div");
			this._main.addClass("menu");
			for(var x in this.data){
				this.data[x].target = this._main;
				new Item(this.data[x])
				
			}
			
		},
	};
	
	Sevian.Input.DesignMenu = DesignMenu;
	sgDesignMenu = DesignMenu;
	
}(Sevian.Input, _sgQuery));

function loadMenu(){
	var $ = _sgQuery;
	
	
	var data = [
		
		{index:0, parent: false, caption: "cero", action:false},
		{index:1, parent: false, caption: "uno", action:false},
		{index:2, parent: false, caption: "dos", action:false},
		{index:3, parent: 0, caption: "tres", action:false},
		{index:4, parent: 0, caption: "cuatro", action:false},
		{index:5, parent: false, caption: "cinco", action:false},
		{index:6, parent: false, caption: "seis", action:false},
		{index:7, parent: false, caption: "siete", action:false},
		{index:8, parent: 5, caption: "ocho", action:false},
		{index:9, parent: 5, caption: "nueve", action:false},
		{index:10, parent: 5, caption: "diez", action:false},
		{index:11, parent: 9, caption: "once", action:false},
		{index:12, parent: 9, caption: "doce", action:false},
		{index:13, parent: 9, caption: "trece", action:false},
		{index:14, parent: false, caption: "catorce", action:false},
		{index:15, parent: false, caption: "quince", action:false},
		
		
	];
	
	var D = new Sevian.Input.DesignMenu({
		data: data,
		target: "#design",
	})
	//alert($("#design").text());
	
	
}

