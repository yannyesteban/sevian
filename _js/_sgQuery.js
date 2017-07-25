// JavaScript Document

var _sg = {

	_on: function(obj, _event, _function){
		if(obj.addEventListener){
			_event = _event.replace(/^\s*on/gi,"");
			obj.addEventListener(_event, _function, false);
		}else if(obj.attachEvent){
			
			obj.attachEvent(_event, _function);
		}// end if		
	},

	_off: function(obj, _event, _function) {
		if(obj.removeEventListener){
			_event = _event.replace(/^\s*on/gi,"");
			obj.removeEventListener(_event, _function, false);
		}else if(obj.detachEvent){
			obj.detachEvent(_event, _function);
		}// end if
	},
	
	prop: function(obj, prop, value){
		if(typeof(prop) === "object"){
			for(var x in prop){
				obj[x] = prop[x];				
			}	
		}else{
			obj[prop] = value;
		}	
	},
	on: function(obj, _event, _function){
		if(typeof(_event) === "object"){
			for(var x in _event){
				this._on(obj, x, _event[x]);				
			}	
		}else{
			
			this._on(obj, _event, _function);
		}	
		
	},

	off: function(obj,_event, _function) {
		if(typeof(_event) === "object"){
			for(var x in _event){
				this._off(obj, x, _event[x]);				
			}	
		}else{
			this._off(obj, _event, _function);
		}	
	},		
	
};




var _sgObjet = function(obj){
	
	this.e = obj;
	/*
	if(obj === undefined || obj === ""){
		this.e = document.body;
	}else if(typeof(obj) === "object"){
		this.e = obj;
	}else if(document.querySelector(obj)){
		this.e = document.querySelector(obj);
	}else if(document.getElementById(obj)){
		this.e = document.getElementById(obj);
	}else{
		this.e = false;
	}

	*/
};

_sgObjet.prototype = {
	get: function(){
		return this.e;
			
	},
	
	create: function(tagName){
		return this.append(_sgQuery.create(tagName));
		
	},
	
	text: function(text, append){
		
		if (text === undefined) {
		   return this.e.innerHTML;
		}
		
		if(append){
			this.e.innerHTML += text;
		}else{
			this.e.innerHTML = text;
		}
		return this;	
		
	},
	
	id: function(id){
		if(id === undefined){
			return this.e.id;
		}
		this.e.id = id;
		return this;
	},
	
	value: function(value){
		this.e.value = value;
		
	},
	
	append: function(obj){
		
		if(!this.e || !this.e.appendChild){
			return this;
		}

		if(typeof(obj) === "object"){
			if(obj instanceof _sgObjet){
				this.e.appendChild(obj.get());
				return obj;
				
			}else if(obj instanceof HTMLElement){
				this.e.appendChild(obj);
			}else{
				return this;	
			}
			
		}else if(document.querySelector(obj)){
			obj = document.querySelector(obj);
			this.e.innerHTML = document.querySelector(obj);
			
		}else{
			
			this.e.innerHTML += obj;
			return this;
		}


		return _sgQuery(obj);
		
	},
	
	appendTo: function(target){
		if(typeof(target) === "object"){
			if(target instanceof _sgObjet){
				target.get().appendChild(this.e);
			}else if(target instanceof HTMLElement){
				target.appendChild(this.e);
			}
		}
		return this;
	},
	
	insertFirst: function(obj){
		
		if(typeof(obj) === "object"){
			if(obj instanceof _sgObjet){
				//this.e.appendChild(obj.get());
				
				this.e.insertBefore(obj.get(), this.e.firstChild);
				//return obj;
				
			}else if(obj instanceof HTMLElement){
				this.e.insertBefore(obj, this.e.firstChild);
			}else{
				//return this;	
			}
			
		}else{
			
			this.e.innerHTML = obj + this.e.innerHTML;
			
		}
		
		return this;
		//this.e.insertBefore(obj, this.e.firstChild);			
		
	},
	
	replace: function(obj){
		
		if(typeof(obj) === "object"){
			if(obj instanceof _sgObjet){
				//this.e.appendChild(obj.get());
				
				this.e.replaceChild(obj.get(), this.e);
				
				//return obj;
				
			}else if(obj instanceof HTMLElement){
				this.e.replaceChild(obj, this.e.firstChild);
			}else{
				//return this;	
			}
			
		}else{
			
			this.e.innerHTML = obj;
			
		}
		
		return this;
		//this.e.insertBefore(obj, this.e.firstChild);			
		
	},
	
	addClass: function(className){
		
		if(className){
			if(typeof(className) === "object"){
				for(var x in className){
					if(className[x] !== false && className[x] !== null){
						this.e.classList.add(className[x]);
					}
					
				}	
			}else{
				this.e.classList.add(className);
			}
		}
		return this;		
		
	},
	removeClass: function(className){
		if(className){
			if(typeof(className) === "object"){
				for(var x in className){
					this.e.classList.remove(className[x]);
				}	
			}else{
				this.e.classList.remove(className);
			}
		}
		
		return this;		
		
	},
	
	prop: function(prop, value){
		_sg.prop(this.e, prop, value);
		return this;
	},
	
	style: function(prop, value){
		
		if(prop){
			_sg.prop(this.e.style, prop, value);
			return this;	
		}else{
			return this.e.style;
		}

	},
	
	ds: function(prop, value){
		
		if(prop){
			_sg.prop(this.e.dataset, prop, value);
			return this;	
		}else{
			return this.e.dataset;
		}
		
	},

	query: function(selector){
		if(this.e.querySelector(selector)){
			return this.e.querySelector(selector);
		}
		return false;
	},
	queryAll: function(selector){
		if(this.e.querySelectorAll(selector)){
			return this.e.querySelectorAll(selector);
		}
		return false;
	},
	childs:function(selector){
		//var ch = this.e.querySelectorAll(selector);
		
		var ch = this.e.childNodes;
		
		for(var x=0; x<ch.length; x++){
			if(ch[x].nodeType == 1){
				db(ch[x].id, "green");
				
			}else{
				db(ch[x].id, "blue");
			}
				
		}
		
	},
	
	on: function(_event, _function){
		_sg.on(this.e, _event, _function);
		return this;
		
		if(this.e.addEventListener){
			_event = _event.replace(/^\s*on/gi,"");
			this.e.addEventListener(_event, _function, false);
		}else if(this.e.attachEvent){
			this.e.attachEvent(_event, _function);
		}// end if		
		
	},

	off: function(_event, _function) {
		_sg.off(this.e, _event, _function);
		return this;		
		if(this.e.removeEventListener){
			_event = _event.replace(/^\s*on/gi,"");
			this.e.removeEventListener(_event, _function, false);
		}else if(this.e.detachEvent){
			this.e.detachEvent(_event, _function);
		}// end if
	},
	fire: function(_event) {
		var evt;

		if (document.createEventObject) {
			// dispatch for IE
			evt = document.createEventObject();
			return this.e.fireEvent("on" + _event, evt);
		}
		else {
			// dispatch for firefox + others
			evt = document.createEvent("HTMLEvents");
			evt.initEvent(_event, true, true); // event type,bubbling,cancelable
			return !this.e.dispatchEvent(evt);
		}
	},		
	
};




var _sgQuery = function(obj){
	
	if(obj instanceof _sgObjet){
		return obj;
	}
	
	var e = false;
	
	if(obj === undefined || obj === ""){
		e = document.body;
	}else if(typeof(obj) === "object"){
		e = obj;
	}else if(document.querySelector(obj)){
		e = document.querySelector(obj);
	}else if(document.getElementById(obj)){
		e = document.getElementById(obj);
	}
	
	if(e !== false){
		return new _sgObjet(e);
	}else{
		return false;
	}
	
};

_sgQuery.byId= function(id){
	if(document.getElementById(id)){
		return document.getElementById(id);
	}
	return false;
	
};

_sgQuery.create= function(opt){
	var e;
	if(typeof(opt) === "object"){
		e = document.createElement(opt.tagName);
		for(var x in opt){
			if(opt.hasOwnProperty(x) && opt[x] !== false && opt[x] !== null){
				
				if(typeof(opt[x]) === "object"){
					
					this.prop(e[x], opt[x]);
				}else{
					e[x] = opt[x];
				}
				
			}
			
		}
	}else{
		e = document.createElement(opt);
	}
	
	return _sgQuery(e);
};

_sgQuery.prop = function(obj, prop){
	for(var x in prop){
		if(prop.hasOwnProperty(x)){
			
			obj[x] = prop[x];
		}
	}
	
};

_sgQuery.bind =function(fn, context){
	if(typeof(fn) === "function"){
		return fn.bind(context);
		/*
		this._main.on(x, function(){
			ME.events[x].call(ME);

		});
		*/
	}else if(typeof(fn) === "string"){
		//function(){eval(ME.events[x])};
		//function(){Function("ME", ME.events[x]).call(this, ME);};
		//this._main.on(x, function(){Function(ME.events[x]).call(ME);});
		return Function(fn).bind(context);
		//this._main.on(x, Function(this.events[x]));

	}
};


_sgQuery.appendStyle = function(style){
	var elem = document.createElement('style');
	
	elem.setAttribute("type", "text/css");

	if(elem.styleSheet){// IE
		elem.styleSheet.cssText = style;
	}else{                
		var tn = document.createTextNode(style);
		elem.appendChild(tn);
	}

	document.getElementsByTagName('head')[0].appendChild(elem);
	

};

_sgQuery.appendScript = function(script){
	var elem = document.createElement('script');
	
	if(document.all){
		elem.text = script;
	}else{
		var tn = document.createTextNode(script);
		elem.appendChild(tn);
	}
	document.getElementsByTagName('head')[0].appendChild(elem);
	
};


_sgQuery.query = function(selector){
	if(document.querySelector(selector)){
		return document.querySelector(selector);
	}
	return false;
};
_sgQuery.queryAll = function(selector){
	if(document.querySelectorAll(selector)){
		return document.querySelectorAll(selector);
	}
	return false;
};


/*	
function a(){
	
	_sgQuery("#e1").fire("click");
}


var div = document.createElement("div");
var input = document.createElement("input");
div.innerHTML=".hola.";
div.style.cssText = "border:2px solid red;padding:4px;";
var s = _sgQuery("span").append(div).create("nav").append("Hola").append(" a todos y ").
create("b").text(" ??").text(" hh", true);
//db(s.get().innerHTML += " adios");

_sgQuery().create("div").text("si");


var c =_sgQuery().create("span").prop("title", "jajaja")
.style("color","green").text("no").append(_sgQuery("#e1")).text("E 01");

//document.body.appendChild(c.get());

//alert(c instanceof _sgObjet)

//s.append("u")
//.append(div);
var f = _sgQuery.create("div").text("Es un Body").appendTo(_sgQuery("body"));

_sgQuery("#e1").on("click", function(){alert(8);});

//f.appendTo();



*/





