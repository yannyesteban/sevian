// JavaScript Document

if(!Sevian){
	var Sevian = {};
}

(function(namespace, $, Tab){

	var createInput = function(opt){
		return new namespace.Input(opt);
	}
	
	var mixin = function(source, target){
		for(var x in source){
			if(source.hasOwnProperty(x)) {
				target[x] = source[x];
			}
		}
	}
	
	var Field = function(opt){
		
		this.caption = "";
		this.className = "";
		this.rules = false;
		this.input = {};
		
		this.id = false;
		this.target = false;
		
		this.mode = "";
		
		for(var x in opt){
			if(this.hasOwnProperty(x)) {
				this[x] = opt[x];
			}
		}
		
		this._main = false;
		this._input = false;
		
		this.create();
		
	};
	
	Field.prototype = {
		get: function(){
			return this._main;
			
		},
		
		create: function(){
			
			this._main = $.create("div");

			if(this.caption !== false){
				this.setCaption(this.caption);
				
			}
			
			var input = this._main.create("div");
			
			this._input = createInput(this.input);
			
			input.append(this._input.get());

			
			
		},
		
		setCaption: function(caption){
			if(!this._caption){
				this._caption = this._main.create("div");
				this._caption.addClass("caption");
			}
			
			this._caption.text(caption);
		},
		getCaption: function(){
			return this._caption;
		},
		
		getInput: function(){
			return this._input;
		},
		
		setMode: function(mode){
			
			this._main.removeClass(this.mode);
			this._main.addClass(mode);
			this._main.ds("sgMenuMode", mode);
			
			this.mode = mode;
		},
		
		getMode: function(){
			return this.mode;	
		},
		
	};
	
	var Page = function(opt){
		
		this.type = "page";
		this.sgType = "sg-page";
		this.sgMain = "sg-page-main";
		
		this.id = false;
		this.name = false;
		this.target = false;
		this.className = false;
		this.caption = false;
		
		
		for(var x in opt){
			if(this.hasOwnProperty(x)){
				this[x] = opt[x];
			}
				
		}
		
		this._main = false;
		this._caption = false;
		this._body = false;
		
		if(opt){
			this.create();
		}
		
		
	};
	
	Page.prototype = {
		
		getType: function(){
			return this.type;	
		},
		
		get: function(){
			return this._main;	
		},
		
		getBody: function(){
			return this._body;	
		},
		
		create: function(){
			var main = this._main = $.create({
				tagName: "div",
				id: this.id,
				className: this.className
			});
			
			
			
			main.ds("sgType",this.sgType);
			main.addClass(this.sgMain);
			
			if(this.caption){
				this.setCaption(this.caption);
				
			}
			
			this._body = this._main.create({
				tagName: "div",
				
				className: "body"
			});
			
			if(this.target){
				this._target = $(this.target);
				
				this._target.append(main);
			}
			
		},
		
		appendTo: function(obj){
				
			obj.append(this._main);
		},
		
		setCaption: function(caption){
			if(!this._caption){
				
				this._caption = this._main.create("div");
				this._caption.addClass("caption");
				
			}
			
			this._caption.text(caption);
		},
		
		
		
		
	};
	
	var Form = function(opt){
		Page.call(this);
		
		this.sgType = "sg-form";
		this.sgMain = "sg-form-main";
		
		this.id = false;
		this.name = false;
		this.className = false;
		this.target = false;
		
		
		this.form = false;
		
		
		this._fields = [];
		
		this._lastPage = false;
		this._lastPageType = "";
		this._lastTab = false;
		this._lastTabIndex = false;
		
		this.tabs = [];
		
		for(var x in opt){
			if(opt.hasOwnProperty(x)){
				this[x] = opt[x];
			}
				
		}
		
		this._main = false;
		
		
		if(!$.byId(this.id)){
			
			//Page.create.call(this.)
			this.create();
			this._lastPage = this._body;
			
		}
		
	};
	Form.prototype = Object.create(Page.prototype);
	Form.prototype.constructor = Form;
	
	var _Form = {
		get: function(){
			return this._main;	
		},
		
		_create: function(){
			
			var main = this._main = $.create({
				tagName: "div",
				id: this.id,
				className: this.className
			});
			
			
			if(this.target){
				this._target = $(this.target);
				
				this._target.append(main);
			}
			
			main.ds("sgType","sg-form");
			main.addClass("sg-form-main");
			
			return main;
		},
		
		
		
		setValue: function(data){
			
		},
		getValue: function(){
			
		},
		
		
		
		addField: function(opt){
			this._fields[opt.name || opt.id] = new Field(opt);
			this._lastPage.append(this._fields[opt.id].get());
		},
		
		addInput: function(opt){
			new namespace.Input(opt);
			//this._fields[opt.name || opt.id] = new namespace.Input(opt);
		},
		
		addTab: function(opt){
			opt.target = this._lastPage;
			var tab = this._tab = new Tab(opt);
			this.tabs.push(tab);
			return tab;
		},
		
		addTabPage: function(opt){
			var tabPage = this._tab.add(opt);
			
			this._lastPage = tabPage.iBody;
		},
		
		setPage: function(page, type){
			this._lastPage = page;
			this._lastType = type;
			
			//if(type)
		},
		
		valid: function(){
			var field = false, msg = false;
			for(var x in this._fields){
				
				if(this._fields[x].rules){
					
					field = this._fields[x];

					
					msg = namespace.Valid.send(field.rules, field.getInput().getValue(), field.caption, this.getValue());
					
					if(msg){
						
						field.setMode("invalid");
						this._tab.show(1);
						alert(msg);
						field.getInput().focus();
						
					}
				}
					
				
			}	
			
		},
		
	};
	
	
	mixin(_Form, Form.prototype);
	
	namespace.Form = Form;
	
	
}(Sevian, _sgQuery, sgTab));