// JavaScript Document
if(!Sevian){
	var Sevian = {};
}
if(!Sevian.Input){
	Sevian.Input = {};
}
var sgDesignMenu = false;

(function(namespace, $){
	
	var _dragItem = false;
	
	var _dragStart = function(item){
		return function(event){
			item.addClass("drag-start");
			event.dataTransfer.setData("text", "start");
			_dragItem = item;
			
		};
	};
	
	var _dragEnd = function(item){
		return function(event){
			item.removeClass("drag-start");
			_dragItem = false;
		};
	};
	
	var _dragOver = function(item){
		return function(event){
			event.preventDefault();
			if(item.id() === _dragItem.id()){
				return false;
			};
		};
	};

	var _dragEnter = function(item){
		return function(event){
			event.preventDefault();
		};
	};
	
	var _dragLeave = function(item){
		return function(event){
			event.preventDefault();
		};
	};
	
	var _drop = function(item, menu){
		
		return function(event){
			
			event.preventDefault();
			event.stopPropagation();
			
			item.removeClass("ul_over");

			if(item.id() === _dragItem.id()){
				return false;
			}
			
			if(1==1){
				menu.addNewItem();
			}
			
			
			var target = item.get().parentNode;
			var elem = _dragItem.get();
			var rect = item.get().getBoundingClientRect();
			var diff = event.clientY - rect.top;
			
			if((diff) < this.offsetHeight/2){
				target.insertBefore(elem, item.get());
				db("UP", "aqua", "blue");
			}else{
				target.insertBefore(elem, item.get().nextSibling);
				db("down", "yellow", "orange");
			}
			
			_dragItem.addClass("drop-end");
			
		};
	};
	
	
	var Item = function(opt){
		this.id = "";
		this._target = false;
		this.caption = false;
		this.menuName = false;
		this._target = false;
		for(var x in opt){
			//if(opt.hasOwnProperty(x)){
			
				this[x] = opt[x];
			//}
			
		}
		this._menu = false;
		if(this.target){
			this._target = $(this.target);
		}
		
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
			this._main = $.create("li").id(this.id)
				.addClass("item").ds("dmIndex", this.index).ds("dsMenu","item");
			
			this._option = this._main.create("div").addClass("option");
			
			this._option.create("input").attr("type", "radio").attr("name", this.chkName);
			this._option.create("input").attr("type", "text").value(this.caption);
			this.createMenu();
			this._option
				.attr("draggable", "true")
				.on("dragstart", _dragStart(this._main))
				.on("dragend", _dragEnd(this._main))
				.on("dragenter", _dragEnter(this._main))
				.on("dragover", _dragOver(this._main))
				.on("dragleave", _dragLeave(this._main))
				.on("drop", _drop(this._main, this.menu))
			;

			
			this._main
				.on("dragover", function(event){
					$(this).addClass("ul_over");
				})
				.on("dragleave", function(event){
					$(this).removeClass("ul_over");

				})
				.on("drop", function(event){
					$(this).removeClass("ul_over");

				});
			var ME = this;
			this._menu
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();
				
				
				
					this.appendChild(_dragItem.get());
				
				
				
					_dragItem.addClass("drop-end");
				
					if(1==1){
						ME.menu.addNewItem();
					}
				
				})
				.on("dragover", function(event){
					event.preventDefault();

				});
			
			
				//.id("name_"+this.id);
			
			
			if(this._target){
				this._target.append(this._main);
			}
			
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
			var 
				data = false,
				main = false,
//				parent = false,
				ME = this;
			
			
			if(!this._main){
				this._main = $.create("div");
			}

			this._main.addClass("design-menu");
			this._main.addClass(this.className);
			
			
			this._main.create("input").attr("type","radio");
			this._caption = this._main.create("span").addClass("caption").text(this.caption);
			
			this._menu = this._main.create("UL").addClass("menu");
			this.length = 0;
			for(var x in this.data){
				
				this.add(this.data[x]);
				continue;
				
				data = this.data[x];
				
				if(data.parent !== false){
					main = this._item[data.parent].getMenu();
				}else{
					main = this._menu;
				}
				data.menuName = this.name;
				data.id = this.name + "_i_" + x;
				data.target = main;
				//data.chkName = this.name+"_chk"
				this._item[data.index] = new Item(data);
				this.length++; 
			}
			
			
			
			if(this.target){
				this._target = $(this.target);
				this._target.append(this._main);
			}
			
			
			this.newUL = this._main.create("ul").addClass("new-item");
			this.addNewItem();
			
			/*
			var newLI = newUL.create("li");	
			
				newLI.create("input").attr("type","button").value("+");
				newLI.create("input").attr("type","text").value("New Item")
			;
			*/
			this._main.create("div").addClass("delete-zone").text("x")
				.on("dragover", function(event){
					event.preventDefault();
				})
				.on("drop", function(event){
					event.preventDefault();
					_dragItem.get().parentNode.removeChild(_dragItem.get());
				});
			
			
		},
		
		addNewItem: function(){
			
			var item = this.add({target:this.newUL, caption:"New Item "+this.length, index:this.length});
			
			
			
			//var option = new Item({target:this.newUL, caption:"New Item "+this.length, index:this.length});
			//this.length++;
			
		},
		
		add: function(opt){
			var main = false;
			
			//opt = this.data[x];
			if(opt.target){
				main = opt.target;
			}else if(opt.parent !== false && opt.parent !== undefined){
				main = this._item[opt.parent].getMenu();
			}else{
				main = this._menu;
			}
			
			if(opt.index === false || opt.index === undefined){
				opt.index = this.length;
			}
			opt.id = this.name + "_i" + opt.index;
			opt.menu = this;
			opt.menuName = this.name;
			opt.target = main;
			opt.chkName = this.name + "_chk";
			this._item[opt.index] = new Item(opt);
			
			db(this._item[opt.index].menu.caption, "red")
			this.length++;
			return this._item[opt.index];
			
		}
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
	var data = [
		
		{index:0, parent: false, caption: "cero", action:false},
		{index:1, parent: false, caption: "uno", action:false},
		{index:2, parent: false, caption: "dos", action:false},
		{index:3, parent: false, caption: "tres", action:false},
		{index:4, parent: false, caption: "cuatro", action:false},
		{index:5, parent: false, caption: "cinco", action:false},
		{index:6, parent: false, caption: "seis", action:false},
		{index:7, parent: false, caption: "siete", action:false},
		{index:8, parent: false, caption: "ocho", action:false},
		{index:9, parent: false, caption: "nueve", action:false},
		{index:10, parent: false, caption: "diez", action:false},
		{index:11, parent: 1, caption: "once", action:false},
		{index:12, parent: 1, caption: "doce", action:false},
		{index:13, parent: 11, caption: "trece", action:false},
		{index:14, parent: 11, caption: "catorce", action:false},
		{index:15, parent: 1, caption: "quince", action:false},
		
		
	];
	var D = new Sevian.Input.DesignMenu({
		name:"menu_1",
		caption: "Menú Principal",
		data: data,
		target: "#design",
	})
	//alert($("#design").text());
	
	
}

