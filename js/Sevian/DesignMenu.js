// JavaScript Document
if(!Sevian){
	var Sevian = {};
}
if(!Sevian.Input){
	Sevian.Input = {};
}
var sgDesignMenu = false;

(function(namespace, $){
	
	var dragItem = false;
	var dragObj = false;
	
	var dragStart = function(opt){
	
		return function(event){
			event.dataTransfer.setData("text","");
			dragObj = opt;
			
			
			
			
			if(opt.type === "item"){
			}
			
		};
	};
	var dragEnd = function(opt){
		
		return function(event){
			//opt.obj.removeClass("drag-start");
			db("dragEnd")
			dragObj = false;
		};
	};
	var dragOver = function(opt){
		return function(event){
			
			event.preventDefault();
			
			if(dragObj && dragObj.type == "item"){
				
				var hand = opt.item.getHand();
				var rect = hand.get().getBoundingClientRect();
				var diff = event.clientY - rect.top;
				opt.obj.addClass("ul_over");
				if((diff) < this.offsetHeight / 2){
					hand.addClass("effect-up");
					hand.removeClass("effect-down");
				}else{
					hand.addClass("effect-down");
					hand.removeClass("effect-up");
				}
			}
			
				
			
		};
	};
	var dragLeave = function(opt){
		return function(event){
			db(this.tagName)
			if(dragObj && dragObj.type == "item"){
				opt.hand.removeClass("effect-down");
				opt.hand.removeClass("effect-up");
				opt.obj.removeClass("ul_over");
			}
		};
	};
	var dragEnter = function(opt){
		return function(event){
			event.preventDefault();
		};
	};
	var drop = function(main){
		return function(event){
			event.preventDefault();
			event.stopPropagation();
			
			if(main.type === "submenu" && dragObj){
				
				db(main.menu)
				main.menu.append(dragObj.obj)
			}
			
			if(main.type === "submenu"){
				return false;
			}
			
			if(dragObj === false){
				
				if(event.dataTransfer.getData("text") !== ""){
					if((event.dataTransfer.getData("text")).match(/\.png/i)){
						main.item.getImage().attr("src", event.dataTransfer.getData("text"));
						return false;
					}
				}
			}
		};
	};
	
	var _item = function(opt){
		
		this.index = false;
		this.parent = false;
		this.caption = false;
		this.action = false;
		this.image = false;
		//this.index = false;
		
		this.target = false;
		this._target = false;
		for(var x in opt){
			this[x] = opt[x];
		}
		
		if(this.target){
			this._target = $(this.target);
		}
		
		this.create();
	};
	
	
	_item.prototype = {
		
		get: function(){
			return this._main;
		},
		
		create: function(){
			
			this._main = $.create("li");
			
			
			this._option = this._main.create("span").addClass("item-option");
			
			this._option.attr("draggable", "false")
				.on("dragstart", dragStart(
					{
						type: "item",
						obj: this._main,
						
					}
				))
				.on("dragend", dragEnd(
					{
						type: "item",
						obj: this._main,
						hand: this._option,
						
					}
				))
				.on("dragover", dragOver(
					{
						type: "menu",
						obj: this._main,
						item: this,
					}
				))
				
				.on("dragenter", dragEnter(
					{
						type: "menu",
						obj: this._main,
					}
				))
				.on("drop", drop(
					{
						type: "menu",
						obj: this._main,
						menu: this._menu,
						item: this,
					}
				));
			
			;
			
			this._main.on("dragleave", dragLeave(
					{
						type: "menu",
						obj: this._main,
						item: this,
						hand: this._option,
					}
				))
			
			this._check = this._option.create("input").prop({"type": "radio", name: this.chkName});
			this._image = this._option.create("img").attr("src", this.image).on("dragstart", dragStart({}));
			this._text = this._option.create("input").attr("type", "text").value(this.caption);
			this._add = this._option.create("span").text("+");
			this._remove = this._option.create("span").text("-");
			this._action = this._option.create("span").text("...");
			this._menu = this._main.create("ul").addClass("submenu");
			this._menu.on("drop", drop({type: 'submenu', obj: this._main, menu: this._menu}))
				.on("dragover", function(event){event.preventDefault();})
			;
			
			
			
			
			
			if(this._target){
				this._target.append(this._main);
			}
			
		},
		getMenu: function(){
			return this._menu;
		
		},
		
		getHand: function(){
			return this._option;
		},
		
		getImage: function(){
			return this._image;
		}
	};
	
	
	
	
	var _dragItem = false;
	
	var _dragStart = function(item){
		return function(event){
			item.addClass("drag-start");
			//event.dataTransfer.setData("nombre", "yanny");
			event.dataTransfer.setData("text", "");
			_dragItem = item;
			
		};
	};
	
	var _dragEnd = function(item){
		return function(event){
			item.removeClass("drag-start");
			
			_dragItem = false;
		};
	};
	
	var _dragOver = function(item, _type){
		
		return function(event){
			
			
			if(event.dataTransfer.getData("text") !== ""){
				event.preventDefault();
				
				return false;
			}
			
			if(!_dragItem){
				return false;
			}
			
			if(item.ds("dmName") !== _dragItem.ds("dmName")){
				return false;
			}
			
			if(item.ds("dmModeItem") === "new"){
				return false;
			}
			
			
			event.preventDefault();
			if(item.id() === _dragItem.id()){
				return false;
			};
			
			
			var elem = _dragItem.get();
			var rect = item.get().getBoundingClientRect();
			var diff = event.clientY - rect.top;
			if((diff) < this.offsetHeight/2){
				item.addClass("effect-up");
				item.removeClass("effect-down");
			}else{
				item.addClass("effect-down");
				item.removeClass("effect-up");
			}
			
			
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
			item.removeClass("effect-down");
			item.removeClass("effect-up");
		};
	};
	
	var _drop = function(item, menu, img){
		
		return function(event){
			
			event.preventDefault();
			event.stopPropagation();
			//db(event.dataTransfer.getData("nombre"),"red","yellow")
			
			if(event.dataTransfer.getData("text")!= ""){
				
				img.attr("src", event.dataTransfer.getData("text"));
				return;
			}
			
			item.removeClass("ul_over");
			item.removeClass("effect-down");
			item.removeClass("effect-up");
			_dragItem.addClass("drop-end");
			
			
			
			if(item.ds("dmName") !== _dragItem.ds("dmName")){
				return false;
			}
			
			if(item.ds("dmModeItem") === "new"){
				return false;
			}
			
			if(item.id() === _dragItem.id()){
				return false;
			}
			
			
			
			
			if(_dragItem.ds("dmModeItem") === "new"){
				_dragItem.ds("dmModeItem", "normal");
				menu.addNewItem();
			}
			
			
			
			var target = item.get().parentNode;
			var elem = _dragItem.get();
			var rect = item.get().getBoundingClientRect();
			var diff = event.clientY - rect.top;
			
			if((diff) < this.offsetHeight/2){
				target.insertBefore(elem, item.get());
				//db("UP", "aqua", "blue");
			}else{
				target.insertBefore(elem, item.get().nextSibling);
				//db("down", "yellow", "orange");
			}
			menu.getCode();
			//_dragItem.addClass("drop-end");
			
		};
	};
	
	
	var Item = function(opt){
		this.id = "";
		this._target = false;
		this.caption = false;
		this.menuName = false;
		this._target = false;
		this.image = "";
		this.action = "";
		
		this._type = "ITEM.....";
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
				.addClass("item").ds("dmIndex", this.index).ds("dsMenu","item").ds("dmName", this.menuName);
			
			this._option = this._main.create("div").addClass("option");
			
			this._option.create("input").attr("type", "radio").attr("name", this.chkName);
			this._img = this._option.create("img").addClass("item-image").attr("src", this.image)
			.on("dblclick", function(){
				this.src = "";
			});
			this._option.create("input").attr("type", "text").value(this.caption)
			.on("dblclick", function(){
				this.select();
			});
			
			this.createMenu();
			this._option.create("input").attr("type", "button").value("+")
			
				.on("click", function(){
					ME.menu._newItem.get().ds("dmModeItem", "normal");
					ME._menu.append(ME.menu._newItem.get());
					ME.menu.addNewItem();
				});
			this._option.create("input").attr("type", "button").value("-")
				.on("click", function(){
					ME.remove();
				});
			this._option.create("span").text("....").addClass("item-action").ds("dmAction", this.action)
				.attr("title", this.action)
				.on("dblclick", function(){
					$(this).ds("dmAction", "");
					this.title = "";
				})
				.on("dragover", function(event){
					
				
					event.preventDefault();
				})
				.on("drop", function(event){
					event.preventDefault();
					if(event.dataTransfer.getData("text") !== ""){
						$(this).ds("dmAction", event.dataTransfer.getData("text"));
						this.title = event.dataTransfer.getData("text");
						event.stopPropagation();
						
					}
					//
				});
			
			
			this._option
				.attr("draggable", "true")
				.on("dragstart", _dragStart(this._main))
				.on("dragend", _dragEnd(this._main))
				.on("dragenter", _dragEnter(this._main))
				.on("dragover", _dragOver(this._main, this._type))
				.on("dragleave", _dragLeave(this._main))
				.on("drop", _drop(this._main, this.menu, this._img))
			;

			
			this._main
				.on("dragover", function(event){
					if(event.dataTransfer.getData("text") !== ""){
						event.preventDefault();
						return false;
					}
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
					
					if(_dragItem.ds("dmModeItem") === "new"){
						_dragItem.ds("dmModeItem", "normal");
						ME.menu.addNewItem();
					}
					
					
				
				})
				.on("dragover", function(event){
					
					if(!_dragItem){
						event.preventDefault();
						return false;
					}
				
					if(ME._main.ds("dmName") !== _dragItem.ds("dmName")){
						return false;
					}
					if(ME._main.ds("dmModeItem") === "new"){
						return false;
					}
				
					event.preventDefault();

				});
			
			
				//.id("name_"+this.id);
			
			
			if(this._target){
				this._target.append(this._main);
			}
			
		},
		
		
		remove: function(){
			if(this.get().ds("dmModeItem") !== "new"){
				db("ok")
				this.get().get().parentNode.removeChild(this.get().get());
			}else{
				db("error")
			}
		},
	};
	
	
	var DesignMenu = function(opt){
		
		this.target = false;
		this.main = false;
		
		
		this.type = "";
		
		this.id = "";
		this.name = "";
		
		this.className = false;
		this.title = "";
		this.value = "";
		this.default = false;
		
		
		
		
		this.data = [];
		this.parent = false;
		this.propertys = {};
		this.style = {};
		this.events = {};
		this.rules = {};
		
		this.modeInit = 1;
		
		this.placeholder = false;
		
		this.status = "normal";
		this.mode = "request";
		
		
		this._menu = false;
		
		this.length = 0;
		for(var x in opt){
			if(opt.hasOwnProperty(x)){
				this[x] = opt[x];
			}
			
		}
		this.input = false;
		this._item = [];
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
			
			this.length = 0;
			this._item = [];
			
			if(!this._main){
				this._main = $.create("div");
			}

			this._main.create("div").text("..........")
			
			.on("drop", function(event){
				db("drop")
				event.preventDefault();
			})
			.on("dragover", function(event){
				db("over")
				event.preventDefault();
			})
			.attr("draggable", "true").addClass("container")
			.on("dragstart", function(event){
				 event.dataTransfer.setData("text", "");
				//event.preventDefault();
				//event.stopPropagation();
			})
			
			
			this._main.addClass("design-menu");
			this._main.addClass(this.className);
			
			
			this._input = this._main.create("textarea").attr("name", this.name);
			
			
			if(this.target){
				this._target = $(this.target);
				this._target.append(this._main);
			}
			var opt = {
				target: this._main.create("ul"),
				caption: this.caption,
				chkName : this.name + "_chk",
			};
			this.item = new _item(opt);
			
			this._menu = this.item._menu;
			
			this.length = 0;
			for(var x in this.data){
				
				this.add(this.data[x]);
				 
			}
			
			this.newUL = this._main.create("ul").addClass("new-item");
			this.addNewItem();
			
			return;
			
			var header = this._main.create("div").addClass("caption");
			header.create("input").attr("type","radio").attr("name", this.name + "_chk").attr("checked", true);
			
			header.create("input").attr("type", "text").addClass("caption").value(this.caption);
			
			header.create("input").attr("type", "button").value("+")
			
			.on("click", function(){
				ME._newItem.get().ds("dmModeItem", "normal");
				ME._menu.append(ME._newItem.get());
				ME.addNewItem();
			});
			header.create("input").attr("type", "button").value("R")
			
			.on("click", function(){
				ME.reset();
			});
			
			header.on("dragover", function(event){
				
				if(ME.name !== _dragItem.ds("dmName")){
						return false;
					}
				
					event.preventDefault();	
					
				})
				.on("drop", function(event){
					event.preventDefault();
					if(_dragItem.ds("dmModeItem") === "new"){
						_dragItem.ds("dmModeItem", "normal");
						ME.addNewItem();
					}
					ME._menu.append(_dragItem.get());
					
				
					
				});
			
			
			this._menu = this._main.create("UL").addClass("menu");
			this.length = 0;
			for(var x in this.data){
				
				this.add(this.data[x]);
				 
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
			this._main.create("div").addClass("delete-zone").text("DELETE")
				.on("dragover", function(event){
					if(ME.name !== _dragItem.ds("dmName")){
						return false;
					}	
				
				
					if(_dragItem.ds("dmModeItem") !== "new"){
						event.preventDefault();
					}
				})
				.on("drop", function(event){
					event.preventDefault();
				
					if(_dragItem.ds("dmModeItem") !== "new"){
						_dragItem.get().parentNode.removeChild(_dragItem.get());
					}
				
					
				});
			this.result = this._main.create("div").id("str").text(".....")
				.on("click", function(){
					this.innerHTML = ME.getCode();
				});
			
			
			
			
		},
		
		
		loadItems: function(data){
			this.length = 0;
			this._item = [];
			
			this._menu.text("");
			for(var x in data){
				this.add(data[x]);
			}	
			
		},
		addNewItem: function(){
			
			this._newItem = this.add({target:this.newUL, caption:"New Item "+(this.length + 1), index:this.length});
			
			this._newItem.get().ds("dmModeItem","new");
			
			
			
			//var option = new Item({target:this.newUL, caption:"New Item "+this.length, index:this.length});
			//this.length++;
			
		},
		
		add: function(opt){
			var main = false;
			
			if(opt.target){
				main = opt.target;
			}else if(opt.parent !== false && opt.parent !== undefined){
				main = this._item[opt.parent].getMenu();
			}else{
				main = this._menu;
			}

			this._item[opt.index] = new _item({
				target: main,
				index: (opt.index === false || opt.index === undefined)? this.length : opt.index,
				parent: opt.parent,
				id: this.name + "_i" + opt.index,
				caption: opt.caption,
				chkName: this.name + "_chk",
				menuName: this.name,
				menu: this,
				action: opt.action || "",
				image: opt.image || ""
			});
			
			
			this.length++;
			return this._item[opt.index];
			
		},
		
		
		getItems: function(node){
			
			var childs = node.queryAll("li");
			var n = childs.length;
			var 
				a = [],
				item = false,
				_index = false,
				_parent = false;
			this.recount = false;
			for(var i = 0; i < n; i++){
				
				
				
				if(this.recount){
					$(childs[i]).ds("dmNewIndex", i);
					
					
					_parent = $(childs[i].parentNode.parentNode).ds("dmNewIndex");
					
					if(_parent === undefined){
						_parent = false;
					}
					
					item = {
						index: $(childs[i]).ds("dmNewIndex"),
						parent: _parent,
						caption: $(childs[i]).query("input[type='text']").value,
						image: $(childs[i]).query("img").getAttribute("src"),
						action: $(childs[i]).query(".item-action").dataset.dmAction,
					};
					
				}else{
					item = {
						index: $(childs[i]).ds("dmIndex"),
						parent: $(childs[i].parentNode.parentNode).ds("dmIndex") || false,
						caption: $(childs[i]).query("input[type='text']").value,
						image: $(childs[i]).query("img").getAttribute("src"),
						action: $(childs[i]).query(".item-action").dataset.dmAction,
					};
				
				}
				
				
				
				a.push(item);
			}
			this._input.value(JSON.stringify(a));
			return a;
		},
		
		reset: function(){
			this.loadItems(this.data);
		},
		
		getCode: function(){
			
			return JSON.stringify(this.getItems(this._menu)); 
		
			
		
		
		},
		
		
		setValue: function(value){
			this._main.get().value = value;
		},
		getValue: function(){
			return this._main.get().value;
		},
		addClass: function(className){
			if(className){
				this._main.addClass(className);
			}
		},
		setClass: function(value){
			
		},
		getClass: function(){
			
		},
		
		on: function(event, fn){
			if(typeof(fn) === "function"){
				this._main.on(event, fn.bind(this));
			}else if(typeof(fn) === "string"){
				this._main.on(event, Function(fn).bind(this));
			}
		},
		off: function(event, fn){
			
		},
		
		getText: function(){
			if(this.type === "select"){
				return this._main.get().options[this._main.get().selectedIndex].text;	
			}
			return this._main.get().value;
		},
		
		readOnly:function(value){
			
		},
		
		disabled:function(value){
			
		},
	
		setStatus:function(value){
			this.status = value;
			this._main.ds("status", value);
		},	
		
		setMode:function(value){
			this.mode = value;
			this._main.ds("mode", value);
		},	
		
		show:function(value){
			
		},	
	
		focus:function(){
			this._main.get().focus();
		},	
		
		selectText: function(){
			if(this._main.get().select){
				this._main.get().select();
			}
			
			
		},
		
		setData:function(data){
			
		},
		
		resetUNO: function(){
			if(this.default !== false){
				this.setValue(this.default);
			}
				
		},
		
		valid: function(){
			
			var result = valid.valid(this.rules, this.getValue(), this.title);
			
			if(result){
					
				this.focus();
				this.setStatus("invalid");
				return false;
			}else{
				this.setStatus("valid");
				
			}
			
			return true;
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
	var data = [
		
		{index:0, parent: false, caption: "cero", action:"Yanny", image:"http://localhost/Awesome%20Icons%20Bundle%206000%20Icons%20PSD%20AI%20SVG%20EPS%20CreativeMarket%20442434/flat-icons/Financial/png_64/Basket.png"},
		{index:1, parent: false, caption: "uno", action:"Esteban"},
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
		{index:15, parent: 1, caption: "quince", action:"Nuñez"},
		
		
	];
	
	//data = [];
	new Sevian.Input.DesignMenu({
		name:"menu_1",
		caption: "Menú Principal",
		data: data,
		target: "#design",
	});
	
	data = [];
	new Sevian.Input.DesignMenu({
		name:"menu_2",
		caption: "Menú Secundario",
		data: data,
		target: "#design2",
	});
	//alert($("#design").text());
	
	
}

