// JavaScript Document
if(!Sevian){
	var Sevian = {};
}
if(!Sevian.Input){
	Sevian.Input = {};
}
var sgDesignMenu = false;
(function(namespace, $){
	
	var allowDrop = function(event){
		event.preventDefault();
	};
	var drag = function(event) {
		event.dataTransfer.setData("text", event.target.id);
	};	
	var drop = function(event) {
		event.preventDefault();
		var data = event.dataTransfer.getData("text");
		event.target.appendChild(document.getElementById(data));
	};
	
	var _dragOver = function(event){
		event.preventDefault();
		event.stopPropagation();
	};
	
	
	var moveTo = function(from, to){
		
		
		
		
	};
	
	
	
	var Item = function(opt){
		this._target = false;
		this.caption = false;
		for(var x in opt){
			//if(opt.hasOwnProperty(x)){
				this[x] = opt[x];
			//}
			
		}
		this._menu = false;
		this._target = $(this.target);
		this.create();
		
	};
	Item.prototype = {
		
		get: function(){
			return this._main;	
		},
		
		createMenu: function(){
			if(!this._menu){
				
				this._menu = this._main.create("UL").addClass("submenu");
			}
			
			
		},
		
		getMenu: function(){
			if(!this._menu){
				this.createMenu();
			}
			return this._menu;
			
		},
		
		create: function(){
			
			
			this._main = this._target.create("LI").addClass("item").ds("dmIndex", this.index).attr("_draggable", "false")
			.id(this.id)
			
			
			
			
			var option = this._main.create("div").addClass("option");
			
			option.create("input").attr("type", "radio").value("1");
			option.create("input").attr("type", "button").value(this.caption);
			option.create("input").attr("type", "button").value("U");
			option.create("input").attr("type", "button").value("D");
			option.create("input").attr("type", "button").value("L");
			option.create("input").attr("type", "button").value("R");
			option.create("input").attr("type", "text").attr("name", this.chkName).value(this.caption);
			var ME = this;
			option.create("span").addClass("drag-container").text("_..._")
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();

					var data = event.dataTransfer.getData("text");
					ME.getMenu().append(document.getElementById(data));
				})
				.on("dragenter", function(event){
					event.preventDefault();
					event.stopPropagation();
				 	this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
				.on("dragover", function(event){
					event.preventDefault();
					event.stopPropagation();
				})
				.on("dragleave", function(event){
					//event.preventDefault();
					event.stopPropagation();
					this.classList.remove('over');

					
				});
			
			this._main
				.on("drop", function(event){
				
					event.preventDefault();
					var data = event.dataTransfer.getData("text");
					//event.target.appendChild(document.getElementById(data));
				
					var main = event.target.parentNode.parentNode;
					//var first = main.firstChild;
				//event.target.parentNode.className="a"
				
				//
				
				//main.appendChild(document.getElementById(data));
				
				//var aux = $().create("div").text("hola").addClass("b");
				
				//aux.append(document.getElementById(data));
				//
				main.insertBefore(document.getElementById(data), event.target.parentNode);
				//	$(main).insertFirst(document.getElementById(data));
				})

				.on("dragover", function(event){
				

					event.preventDefault();

				});
			
			
			
			
			
			this._main.attr("draggable", "true").id(this.id+"x")
			
			.on("dragstart", function(event){
				 //event.preventDefault();
				event.stopPropagation(); // Stops some browsers from redirecting.
  			 	//this.style.opacity = '0.4';
				event.dataTransfer.setData("text", event.target.id);
				this.style.transform = "scale(0.5)";
				
				//event.dataTransfer.effectAllowed = "copyMove";
				/*
				var dragIcon = $.create("img");
				dragIcon.get().src = '../images/menu.png';
				var img  = $().create("div").text("HOLA");
				img.style({
					display:"none",
					position:"absolute",
					left:"0px",
					top:"0px"
				});
				
				this.style.display = "none"
				
				
				event.dataTransfer.setDragImage(dragIcon.get(), -0, -0);
				*/
			})
			.on("dragend", function(event){
				event.dataTransfer.getData("text");
				this.style.transform = "scale(1)";
				
			})
			
			
			
			;
			
			//option.text(this.caption);
			
			
			//this._main.text(this.caption).addClass("item");
			//db(this.caption, "red");
		},
		
		
		
		
	};
	
	
	var DesignMenu = function(opt){
		
		this.name = false;
		
		this.data = [];
		this.target = false;
		this.main = false;
		this._menu = false;
		this._item = [];
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
			var data = false, main = false, parent, ME = this;
			this._main = this._target.create("div")
			.on("_dragover", drag)
			.on("_drop", drop);
			
			this._main.create("div").addClass("delete").id("borrar").text("Borrar")
			.on("dragover", function(event){
				
				event.preventDefault();
				
			})
			.on("drop", function(event){
				event.preventDefault();
				var data = event.dataTransfer.getData("text");
				
				
				var parent = document.getElementById(data).parentNode;
				
				parent.removeChild(document.getElementById(data));
				//db(event.target.id)
				//event.target.appendChild(document.getElementById(data));
			});
			this._main.create("div").addClass("add").id("init").text("agregar")
			
			.on("drop", function(event){
				event.preventDefault();
				var data = event.dataTransfer.getData("text");
				
				
				//var parent = document.getElementById(data).parentNode;
				
				ME._menu.append(document.getElementById(data));
				
				
				//parent.removeChild(document.getElementById(data))
				//db(event.target.id)
				//event.target.appendChild(document.getElementById(data));
			})
			
			.on("dragenter", function(event){
					event.preventDefault();
					event.stopPropagation();
				 	this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
			.on("dragover", function(event){
				event.preventDefault();
				event.stopPropagation();
			})
			.on("dragleave", function(event){
				//var data = event.dataTransfer.getData("text");
				//alert(data)
				document.getElementById(data).style.transform = "scale(1)";
				//event.preventDefault();
				event.stopPropagation();
				this.classList.remove('over');


			})
			
			;
			
			this._menu = this._main.create("UL").addClass("menu");
			
			//this._main.addClass("menu");
			for(var x in this.data){
				data = this.data[x];
				
				if(data.parent !== false){
					//main = this._main.query("div[data-dm-index="+data.parent+"]");
					
					main = this._item[data.parent].getMenu();
					
					//main = this._main.query("li[data-dm-index='"+data.parent+"']").getMenu();
					
				//menu.getMenu();
					
					
					
				}else{
					main = this._menu;
				}
				
				data.id = "i"+x;
				data.target = main;
				data.chkName = this.name+"_chk"
				this._item[data.index] = new Item(data);
				
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
		{index:3, parent: false, caption: "tres", action:false},
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
		name:"menu_1",
		data: data,
		target: "#design",
	})
	//alert($("#design").text());
	
	
}

