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
	
	
	
	
	
	
	var _dragItem = false;
	
	var _dragStart = function(item, className){
		return function(event){
			event.dataTransfer.setData("text", "start");
			_dragItem = item;
			
		}
	}
	var _dragEnd = function(item, className){
		return function(event){
			//item.style().opacity = "0.5";
			
		}
	}
	
	var _dragOver = function(item, className){
		return function(event){
			event.preventDefault();
			//event.stopPropagation();
			if(item.id() === _dragItem.id()){
				return false;
				
			}
			
			
			//item.addClass("ul_over");
		}
			
	};
	var _dragEnter = function(item, className){
		return function(event){
			event.preventDefault();
			//item.style().border = "5px solid green";
		}
	}
	var _dragLeave = function(item, className){
		return function(event){
			
			event.preventDefault();
			
			//item.removeClass("ul_over");
			//item.style().border = "2px solid orange";
		}
	}
	
	var _drop = function(item, className){
		
		return function(event){
			db("drop")
			
			
			event.preventDefault();
			
			event.stopPropagation();
			item.removeClass("ul_over");
			if(item.id() === _dragItem.id()){
				return false;
				
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
				
				//main.insertBefore(parent, _dragItem.get().nextSibling);
				db("down", "yellow", "orange");
			}
			
			//item.removeClass("ul_over");
			//previousSibling
			//nextSibling 
			
			//item.style().border = "";
			return;
			
			//event.dataTransfer.getData("text");
			
			parent = item.get().parentNode;
			//parent.style.border = "2px solid red"
			
			
			
			
			


			var main = parent;//.parentNode;
			main.insertBefore(_dragItem.get(), parent);

			//db((rect.top-event.clientY)+"---"+this.offsetHeight+"..."+rect.top+"..."+event.clientY, "aqua", "blue");

			if((diff)<this.offsetHeight/2){

				db("UP", "aqua", "blue")
			}else{
				main.insertBefore(parent, _dragItem.get());
				db("down", "yellow", "orange")
			}			
			
			
			
		}
	}
	
	
	
	
	
	var Item = function(opt){
		this._target = false;
		this.caption = false;
		this.menuName = false;
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
		
		createORG: function(){
			var ME = this;
			
			this._main = this._target.create("li").id(this.id)//.attr("draggable", "true")
				.addClass("item").ds("dmIndex", this.index).ds("dsMenu","item")
			
				.on("drop", function(event){
					
					db("DROP 2")
				
					event.preventDefault();
					ME.getMenu().removeClass("ul_over");
					
				return;
					if(!$.byId(event.dataTransfer.getData("text"))){
						return;
					}
					
					var elem = $(event.dataTransfer.getData("text")).get();
					var parent = event.target;
				
					do{
						parent = parent.parentNode;
					}while(parent.tagName !== "LI" && parent);
					
					var main = parent.parentNode;
					main.insertBefore(elem, parent);
					main.insertBefore(parent, elem);

				})
				.on("dragover", function(event){
					ME.getMenu().addClass("ul_over");
					//$(this).addClass("li_over");
					event.preventDefault();
					//event.stopPropagation();
				})
				.on("dragenter", function(event){
				
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
				
				.on("dragleave", function(event){
					event.preventDefault();
					//event.stopPropagation();
					//ME.getMenu().style().minHeight = "0px";
					//$(this).removeClass("li_over");
					ME.getMenu().removeClass("ul_over");
				
					
				})
				
			;
			
			
			
			
			var option = this.option = this._main.create("div").addClass("option").id("o"+this.id);
			
			option
				
			.on("drop", function(event){
				
				db("DROP");
				event.preventDefault();
				event.stopPropagation();
ME.getMenu().removeClass("ul_over");
				if(!$.byId(event.dataTransfer.getData("text"))){
					return;
				}

				var elem = $(event.dataTransfer.getData("text")).get();
				var parent = event.target;

				do{
					parent = parent.parentNode;
				}while(parent.tagName !== "LI" && parent);
				
				
				var rect = this.getBoundingClientRect();
				var diff = event.clientY-rect.top;
				
				
				var main = parent.parentNode;
				main.insertBefore(elem, parent);
				
				//db((rect.top-event.clientY)+"---"+this.offsetHeight+"..."+rect.top+"..."+event.clientY, "aqua", "blue");
				
				if((diff)<this.offsetHeight/2){
					
					//db("UP", "aqua", "blue")
				}else{
					main.insertBefore(parent, elem);
					//db("down", "yellow", "orange")
				}
				
				$(elem).addClass("m_open");
				ME.option.removeClass("effect-up").removeClass("effect-down");
				

				
				
				
			})	
			.on("dragenter", function(event){
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})	
			.on("dragover", function(event){
				event.preventDefault();
				//db("ID: "+this.id+"..."+this.offsetHeight+"..."+this.offsetTop+"..."+event.clientY, "aqua", "blue");
				var rect = this.getBoundingClientRect();
				//db("ID: "+this.id+"..."+this.offsetHeight+"..."+rect.top+"..."+event.clientY, "aqua", "blue");
				//return;
				
				//db((rect.top.toFixed(0)+"-"+event.clientY), "aqua", "purple");
				
				if((event.clientY-rect.top)<this.offsetHeight/2){
					$(this).removeClass("effect-down");
					$(this).addClass("effect-up");
					//db("UP", "aqua", "blue")
				}else{
					$(this).removeClass("effect-up");
					$(this).addClass("effect-down");
					//db("down", "yellow", "orange")
				}
				//ME.getMenu().addClass("ul_over");
			})
			.on("dragleave", function(event){
				$(this).removeClass("effect-up").removeClass("effect-down");
				//ME.getMenu().removeClass("ul_over");
			})
			
			.on("dragend", function(event){
				//db("THE END"+$(this).id());
				//db(event.target.id+"....")
				//this.style.fontSize = "14pt;"
				//ME.option.removeClass("effect-up").removeClass("effect-down");
				
			})
			
			var hand = option.create("div").addClass("hand").text("").attr("draggable", "true")
			.on("dragend", function(event){
				db(81.0001)
				ME._main.removeClass("effect-start");
			})
			
			.on("dragstart", function(event){
				//db(this.tagName, "red")
				db(ME.id, "blue");
				ME.getMenu().removeClass("ul_over");
				event.dataTransfer.setData("text", ME.id);//event.target.id);
				ME._main.addClass("effect-start");
				//event.preventDefault();
				//event.stopPropagation(); // Stops some browsers from redirecting.
				
				
				
			});
			
			;
			
			
			option.create("input").attr("type", "text").value(this.caption)
			
			.on("dragstart", function(event){
				
			
				
			})
			
			.on("_focus", function(){
				db(ME._main.attr("draggable"),"blue")
				ME._main.get().draggable = "";
				this.draggable = "";
				db(ME._main.attr("draggable"),"red")
				
			})
			.on("_blur", function(){
				db(ME._main.attr("draggable"),"blue")
				ME._main.get().draggable = "true";
				this.draggable = "true";
				db(ME._main.attr("draggable"),"red")
				
			})
			;
			
			
			
			
			var ME = this;
			option.create("span").addClass("drag-container").text("_..._")
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();

					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
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
			
			this.createMenu();
			
			this._menu
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();
db("menu", "red")
					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
				})
				.on("dragenter", function(event){
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
				.on("dragover", function(event){
					event.preventDefault();
					//event.stopPropagation();
				})
				.on("dragleave", function(event){
					//event.preventDefault();
					//event.stopPropagation();
					//this.classList.remove('over');

					
				});
			
			return;
			
			
			
			option.create("input").attr("type", "radio").value("1");
			option.create("input").attr("type", "button").value(this.caption)
			
			.attr("draggable", "true")
				.on("drop", function(event){
db("opt")
						event.preventDefault();
					//event.stopPropagation();
				})
			
			;
			option.create("input").attr("type", "button").value("U");
			option.create("input").attr("type", "button").value("D");
			option.create("input").attr("type", "button").value("L");
			option.create("input").attr("type", "button").value("R");
			
			
			
			var t = option.create("input").attr("type", "text")
				.attr("name", this.chkName).value(this.caption)
				//.attr("draggable", "false")
				.on("drop", function(event){
					db(333)	
					//event.preventDefault();
					//event.stopPropagation();
				})
			
			.on("dragstart", function(event){
				db(1111)
				//event.preventDefault();
				//event.stopPropagation();
				
			})
			;
			var ME = this;
			option.create("span").addClass("drag-container").text("_..._")
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();

					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
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
			
			var hand = option.create("span").addClass("hand").text("HAND")
			
				.attr("draggable", "true").id(this.id+"hand")
			;
			hand.create("input").attr("type", "text").val("HOLA")
				//.attr("draggable", "false")
			.on("_dragstart", function(event){
				db(this.tagName)
				db(this.id, "blue")
				//event.preventDefault();
				//event.stopPropagation(); // Stops some browsers from redirecting.
				
				
				
			});
			
			
			;
			hand.on("dragstart", function(event){
				db(this.id, "red")
				event.stopPropagation(); // Stops some browsers from redirecting.
				event.dataTransfer.setData("text", ME.id+"x");//event.target.id);
				
				
			});
			
			
			
			return;
			this._main
				.on("drop", function(event){
					db(ME.id+"x")
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
				
				
				main.insertBefore(event.target.parentNode, document.getElementById(data));
				//	$(main).insertFirst(document.getElementById(data));
				})

				.on("dragover", function(event){
				

					event.preventDefault();

				});
			
			
			
			
			
			this._main//.attr("draggable", "false").id(this.id+"x")
			
			.on("dragstart_", function(event){
				
				 //event.preventDefault();
				event.stopPropagation(); // Stops some browsers from redirecting.
				event.dataTransfer.setData("text", ME.id+"x");/*event.target.id);
				this.style.transform = "scale(0.9, 1)";
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
				
				event.dataTransfer.setDragImage(dragIcon.get(), -0, -0);
				*/
			})
			.on("dragend_", function(event){
				event.dataTransfer.getData("text");
				this.style.transform = "scale(1)";
				
			})
			;
		},
		
		
		create: function(){
			this._main = this._target.create("li").id(this.id)
				.addClass("item").ds("dmIndex", this.index).ds("dsMenu","item");
			
			this._option = this._main.create("div").addClass("option");
			
			this._option.create("input").attr("type", "radio").attr("name", this.id+"_chk");
			this._option.create("input").attr("type", "text").value(this.caption);
			this.createMenu();
			this._option
				.attr("draggable", "true")
				.on("dragstart", _dragStart(this._main))
				.on("dragend", _dragEnd(this._main))
				.on("dragenter", _dragEnter(this._main))
				.on("dragover", _dragOver(this._main))
				.on("dragleave", _dragLeave(this._main))
				.on("drop", _drop(this._main))
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
db(this.id, "red")
					//var data = event.dataTransfer.getData("text");
					this.appendChild(_dragItem.get());
				})
			.on("dragover", function(event){
					event.preventDefault();
					//event.stopPropagation();

				})
			
			
				.id("name_"+this.id)
			
			
			
			return;
			var ME = this;
			
			this._main = this._target.create("li").id(this.id)//.attr("draggable", "true")
				.addClass("item").ds("dmIndex", this.index).ds("dsMenu","item")
			
				.on("drop", function(event){
					
					db("DROP 2")
				
					event.preventDefault();
					ME.getMenu().removeClass("ul_over");
					
				return;
					if(!$.byId(event.dataTransfer.getData("text"))){
						return;
					}
					
					var elem = $(event.dataTransfer.getData("text")).get();
					var parent = event.target;
				
					do{
						parent = parent.parentNode;
					}while(parent.tagName !== "LI" && parent);
					
					var main = parent.parentNode;
					main.insertBefore(elem, parent);
					main.insertBefore(parent, elem);

				})
				.on("dragover", function(event){
					ME.getMenu().addClass("ul_over");
					//$(this).addClass("li_over");
					event.preventDefault();
					//event.stopPropagation();
				})
				.on("dragenter", function(event){
				
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
				
				.on("dragleave", function(event){
					event.preventDefault();
					//event.stopPropagation();
					//ME.getMenu().style().minHeight = "0px";
					//$(this).removeClass("li_over");
					ME.getMenu().removeClass("ul_over");
				
					
				})
				
			;
			
			
			
			
			var option = this.option = this._main.create("div").addClass("option").id("o"+this.id);
			
			option
				
			.on("drop", function(event){
				
				db("DROP");
				event.preventDefault();
				event.stopPropagation();
ME.getMenu().removeClass("ul_over");
				if(!$.byId(event.dataTransfer.getData("text"))){
					return;
				}

				var elem = $(event.dataTransfer.getData("text")).get();
				var parent = event.target;

				do{
					parent = parent.parentNode;
				}while(parent.tagName !== "LI" && parent);
				
				
				var rect = this.getBoundingClientRect();
				var diff = event.clientY-rect.top;
				
				
				var main = parent.parentNode;
				main.insertBefore(elem, parent);
				
				//db((rect.top-event.clientY)+"---"+this.offsetHeight+"..."+rect.top+"..."+event.clientY, "aqua", "blue");
				
				if((diff)<this.offsetHeight/2){
					
					//db("UP", "aqua", "blue")
				}else{
					main.insertBefore(parent, elem);
					//db("down", "yellow", "orange")
				}
				
				$(elem).addClass("m_open");
				ME.option.removeClass("effect-up").removeClass("effect-down");
				

				
				
				
			})	
			.on("dragenter", function(event){
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})	
			.on("dragover", function(event){
				event.preventDefault();
				//db("ID: "+this.id+"..."+this.offsetHeight+"..."+this.offsetTop+"..."+event.clientY, "aqua", "blue");
				var rect = this.getBoundingClientRect();
				//db("ID: "+this.id+"..."+this.offsetHeight+"..."+rect.top+"..."+event.clientY, "aqua", "blue");
				//return;
				
				//db((rect.top.toFixed(0)+"-"+event.clientY), "aqua", "purple");
				
				if((event.clientY-rect.top)<this.offsetHeight/2){
					$(this).removeClass("effect-down");
					$(this).addClass("effect-up");
					//db("UP", "aqua", "blue")
				}else{
					$(this).removeClass("effect-up");
					$(this).addClass("effect-down");
					//db("down", "yellow", "orange")
				}
				//ME.getMenu().addClass("ul_over");
			})
			.on("dragleave", function(event){
				$(this).removeClass("effect-up").removeClass("effect-down");
				//ME.getMenu().removeClass("ul_over");
			})
			
			.on("dragend", function(event){
				//db("THE END"+$(this).id());
				//db(event.target.id+"....")
				//this.style.fontSize = "14pt;"
				//ME.option.removeClass("effect-up").removeClass("effect-down");
				
			})
			
			var hand = option.create("div").addClass("hand").text("").attr("draggable", "true")
			.on("dragend", function(event){
				db(81.0001)
				ME._main.removeClass("effect-start");
			})
			
			.on("dragstart", function(event){
				//db(this.tagName, "red")
				db(ME.id, "blue");
				ME.getMenu().removeClass("ul_over");
				event.dataTransfer.setData("text", ME.id);//event.target.id);
				ME._main.addClass("effect-start");
				//event.preventDefault();
				//event.stopPropagation(); // Stops some browsers from redirecting.
				
				
				
			});
			
			;
			
			
			option.create("input").attr("type", "text").value(this.caption)
			
			.on("dragstart", function(event){
				
			
				
			})
			
			.on("_focus", function(){
				db(ME._main.attr("draggable"),"blue")
				ME._main.get().draggable = "";
				this.draggable = "";
				db(ME._main.attr("draggable"),"red")
				
			})
			.on("_blur", function(){
				db(ME._main.attr("draggable"),"blue")
				ME._main.get().draggable = "true";
				this.draggable = "true";
				db(ME._main.attr("draggable"),"red")
				
			})
			;
			
			
			
			
			var ME = this;
			option.create("span").addClass("drag-container").text("_..._")
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();

					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
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
			
			this.createMenu();
			
			this._menu
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();
db("menu", "red")
					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
				})
				.on("dragenter", function(event){
					event.preventDefault();
					//event.stopPropagation();
				 	//this.classList.add('over');
					//$(event.target).addClass("b")
				
				})
				.on("dragover", function(event){
					event.preventDefault();
					//event.stopPropagation();
				})
				.on("dragleave", function(event){
					//event.preventDefault();
					//event.stopPropagation();
					//this.classList.remove('over');

					
				});
			
			return;
			
			
			
			option.create("input").attr("type", "radio").value("1");
			option.create("input").attr("type", "button").value(this.caption)
			
			.attr("draggable", "true")
				.on("drop", function(event){
db("opt")
						event.preventDefault();
					//event.stopPropagation();
				})
			
			;
			option.create("input").attr("type", "button").value("U");
			option.create("input").attr("type", "button").value("D");
			option.create("input").attr("type", "button").value("L");
			option.create("input").attr("type", "button").value("R");
			
			
			
			var t = option.create("input").attr("type", "text")
				.attr("name", this.chkName).value(this.caption)
				//.attr("draggable", "false")
				.on("drop", function(event){
					db(333)	
					//event.preventDefault();
					//event.stopPropagation();
				})
			
			.on("dragstart", function(event){
				db(1111)
				//event.preventDefault();
				//event.stopPropagation();
				
			})
			;
			var ME = this;
			option.create("span").addClass("drag-container").text("_..._")
				.on("drop", function(event){
					event.preventDefault();
					event.stopPropagation();

					var data = event.dataTransfer.getData("text");
					ME.getMenu().insertFirst(document.getElementById(data));
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
			
			var hand = option.create("span").addClass("hand").text("HAND")
			
				.attr("draggable", "true").id(this.id+"hand")
			;
			hand.create("input").attr("type", "text").val("HOLA")
				//.attr("draggable", "false")
			.on("_dragstart", function(event){
				db(this.tagName)
				db(this.id, "blue")
				//event.preventDefault();
				//event.stopPropagation(); // Stops some browsers from redirecting.
				
				
				
			});
			
			
			;
			hand.on("dragstart", function(event){
				db(this.id, "red")
				event.stopPropagation(); // Stops some browsers from redirecting.
				event.dataTransfer.setData("text", ME.id+"x");//event.target.id);
				
				
			});
			
			
			
			return;
			this._main
				.on("drop", function(event){
					db(ME.id+"x")
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
				
				
				main.insertBefore(event.target.parentNode, document.getElementById(data));
				//	$(main).insertFirst(document.getElementById(data));
				})

				.on("dragover", function(event){
				

					event.preventDefault();

				});
			
			
			
			
			
			this._main//.attr("draggable", "false").id(this.id+"x")
			
			.on("dragstart_", function(event){
				
				 //event.preventDefault();
				event.stopPropagation(); // Stops some browsers from redirecting.
				event.dataTransfer.setData("text", ME.id+"x");/*event.target.id);
				this.style.transform = "scale(0.9, 1)";
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
				
				event.dataTransfer.setDragImage(dragIcon.get(), -0, -0);
				*/
			})
			.on("dragend_", function(event){
				event.dataTransfer.getData("text");
				this.style.transform = "scale(1)";
				
			})
			;
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
			
			this._caption = this._main.create("div").addClass("caption").text(this.caption);
			
			this._menu = this._main.create("UL").addClass("menu");
			
			for(var x in this.data){
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
				
			}
			
			if(this.target){
				this._target = $(this.target);
				this._target.append(this._main);
			}
			
			this._main.create("div").addClass("delete").id("borrar").text("Borrar")
			.on("dragover", function(event){
				
				event.preventDefault();
				
			})
			.on("drop", function(event){
				event.preventDefault();
				var data = event.dataTransfer.getData("text");
				
				db(_dragItem)
				var parent = _dragItem.get().parentNode;
				
				parent.removeChild(_dragItem.get());
				//db(event.target.id)
				//event.target.appendChild(document.getElementById(data));
			});
			
			db("END");
			return;
			
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

					ME._menu.insertFirst(document.getElementById(data));


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

