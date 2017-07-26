// JavaScript Document


var Report = false;
(function($, Float, Drag){
	
	var Page = function(opt){
		
		for(var x in opt){
			
			this[x] = opt[x];
		}
		
		this.create();
		
		
	};
	
	
	Page.prototype = {
		create: function(){
			
			this._main = this.target.create("div").addClass("main");
			
			this._page = this._main.create("div").addClass("page");
			
			this._header = this._page.create("div").addClass("header");
			this._body = this._page.create("div").addClass("body");
			this._footer = this._page.create("div").addClass("footer");
			
			
		},
		
		
	};
	
	
	var Group = function(opt){
		
		for(var x in opt){
			
			this[x] = opt[x];
		}
		
		this.create();
		
	};
	
	Group.prototype = {
			
		create: function(){
			this._main = this.target.create("div").addClass("group");
		},
		
		
		add: function(opt){
			
			
		},
		
	};
	
	Report = function(opt){
		this.height = "100%";
		this.width = "100%";
		
		this.g = [];
		this.gIndex = 0;
		this.p = [];
		this.pIndex = 0;
		this._pages = 0;
		this.headerHTML = "";
		
		for(var x in opt){
			
			this[x] = opt[x];
		}
		
		
		
		this._main = $(this.main).style({
			//height: this.height,
			//width: this.width,
		});
		
		
		//this._header = this._main.create("div").addClass("header");
		//this._body = this._main.create("div").addClass("body");
		//this._foot = this._main.create("div").addClass("foot");
		
	};
	
	
	Report.prototype = {
		addPage: function(opt){
			
			this._pages++;
			
			opt.target = $(this.main);
			this._page = this.p[this.pIndex++] = new Page(opt);
			
			
			
			this._page._header.text(this.headerHTML);
			if(this._pages === 1){
				this._page._header.text($("pag1").text(), true);
			}
			
			
			
			this._page = this._page._body;
			this._page.style({
				width: this.width,
				height: this.height,
				
			});
			
			var g = Float.getXY(this._page.get());
			//db(g.height, "blue")
			this._page.get().style.maxHeight = g.height+"px";
			//db(g.height)
			
		},
		
		
		addGroup: function(opt){
			opt.target = $(this.main);
			this._page = this.g[this.gIndex++] = new Group(opt);
			
		},
		
		setHeader: function(html){
			db(4444)
			db(html)
			this.headerHTML = html;
			
			
		},
		
		createHtable: function(){
			var row = this._page.create("div").addClass("row");
			for(var x in this.fields){
				cell = row.create("div").addClass("cell").text(this.fields[x].title);
				
				
			}
			var rxy = Float.getXY(row.get());
			return  rxy.height;
			
		},
		
		add: function(data){
			var l = false, m = false, rxy = false, pxy, row = false, n = 0, cell=false, x =false;
			
			var xy = Float.getXY(this._page.get());
			
			n = n + this.createHtable();
			for(x in data){
				
				
				if(x> 0 && x % 10 == 0){
					//this.addGroup({});	
				}
				
				//l = this._page._main.create("div").addClass("row");
				
				row = this._page.create("div").addClass("row");
				
				for(var y in data[x]){
					 
					
					cell = row.create("div").addClass("cell").text(data[x][y]);
					
					
					
				}
				
				rxy = Float.getXY(row.get());
				pxy = Float.getXY(this._page.get());
				
				//db(rxy.height, "red");
				//db(rxy.height*n, "red");
				//db(pxy.height, "green");
				
				n = n + rxy.height;
				if((n) >pxy.height){
					n = rxy.height;
					
					//this._page.get().style.maxHeight = "auto !important";
					//this._page.get().style.height = "auto  !important";
					
					
					//this._page.get().style.flex = "0 0 auto";
					
					this.addPage({});
					
					n = n + this.createHtable();
					this._page.append(row);
				}
				
				
				
			}
		
		
		},
		
	};
	
	
	
}(_sgQuery, _sgFloat, _sgDrag));

var r = new Report({
	main: "#main",
	
	
});

r.setHeader('<img src="http://localhost/sibo/images/logo_sibo.png">');

r.fields = [
	{name:"cedula", title:"Cédula de Identidad"},
	{name:"nombre", title:"Nombre"},
	{name:"apellido", title:"Apellido"},
	{name:"edad", title:"Edad"},
	{name:"ciudad", title:"Ciudad"},
	
	
];


r.data=[
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,"sadfs<br>sda sdadf" ,654654,'sadfs<br>sdasd adf','sdf1321'
],
	[
	465456,"sadfs<br>sdasd adf",654654,'sadfs<br>sdasd adf','sdf1321'
],	[
	465456,"sadfs<br>sdasd adf",654654,'sadfs<br>sdasd adf','sdf1321'
],	[
	465456,"sadfs<br>sdasd adf",654654,'sadfs<br>sdasd adf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	
	
	
];

r.addPage({});
r.add(r.data);
