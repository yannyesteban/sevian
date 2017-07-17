// JavaScript Document

if(!Sevian){
	
	var Sevian = {};
	
}

var ssInput = false;
(function(namespace, $){
	
	
	var ssInput = function(opt){
		
		this.type = "";
		
		this.id = "";
		this.name = "";
		this.className = false;
		this.title = "";
		this.value = "";
		this.default = "";
		
		this.target = false;
		
		
		this.title = "";
		
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
		
		for(var x in opt){
			if(this.hasOwnProperty(x)){
				this[x] = opt[x];
			}
				
		}
		this._main = false;
		this._target = false;
		this.init();
		
		
	};
	
	ssInput.prototype = {
		
		get: function(){
			return this._main;
		},
		
		create: function(){
			
			var opt = {};
			
			switch(this.type){
				case "text":
				case "password":
				case "hidden":
				case "button":
				case "submit":
					opt.tagName = "input";
					opt.type = this.type;
					
					break;
				case "select":
					opt.tagName = this.type;
					break;
				case "multiple":
					opt.tagName = "select";
					this.propertys.multiple = "multiple";
					break;
				case "textarea":
					opt.tagName = this.type;
					break;
				default:
					opt.tagName = "input";
					opt.type = "text";
				
			}
			
			this.modeInit = 1;
			
			this._main = $.create(opt);
			
		},
		
		init: function(){
			
			if(this.id && $.byId(this.id)){
				this._main = $("#" + this.id);
			}else{
				
				this.create();	
			}
			if(this.target){
			
				$(this.target).append(this._main);	
			}
			
			if(this.modeInit === 1){
				if(this.name){
				this._main.get().name = this.name;	
				}
				if(this.id){
					this._main.get().id = this.id;	
				}
				if(this.className){
					this._main.addClass(this.className);
				}
				if(this.placeholder){
					this._main.get().placeholder = this.placeholder;	
				}
				
				
			}
			
			
			
			for(var x in this.events){
				this.on(x, this.events[x]);
			}
			
			this._main.prop(this.propertys);
			this._main.style(this.style);
			
			if(this.type === "select"){
				this.createOptions(this.value, false);
			}
			
			this.setValue(this.value);
			
			this.setStatus(this.status);
			this.setMode(this.mode);	
			
				
		},
		
		setValue: function(value){
			this._main.get().value = value;
		},
		getValue: function(){
			return this._main.get().value;
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
	
		focus:function(value){
			this._main.get().focus();
		},	
	
		setData:function(data){
			
		},
		
		reset: function(){
			this.setValue(this.default);	
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
		
		createOptions: function(value, parentValue){
		
			var i = 0,
				option = false,
				vParent = [],
				_ele = this._main.get();
			
			_ele.length = 0;
			
			if(this.parent){
				var aux = (parentValue + "").split(",");
				for(i = 0; i < aux.length; i++){
					vParent[aux[i]] = true;
				}
			}
	
			if(this.placeholder){
				option = document.createElement("OPTION");
				option.value = "";
				option.text = this.placeholder;
				_ele.options.add(option);
			}
			
			for (i in this.data){
				if(vParent[this.data[i][2]] || !this.parent || this.data[i][2] === "*"){
					option = document.createElement("OPTION");
					option.value = this.data[i][0];
					option.text = this.data[i][1];
					_ele.options.add(option);
				}
			}
			
		},
		
	};
	
	namespace.Input = ssInput;
	
	
}(Sevian, _sgQuery));