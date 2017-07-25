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
			
			this._main = this.target.create("div").addClass("page");
			this._header = this._main.create("div").addClass("header");
			this._body = this._main.create("div").addClass("body");
			this._footer = this._main.create("div").addClass("footer");
			
			
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
		this.height = "400px";
		this.width = "800px";
		
		this.g = [];
		this.gIndex = 0;
		this.p = [];
		this.pIndex = 0;
		for(var x in opt){
			
			this[x] = opt[x];
		}
		
		
		
		this._main = $(this.main).style({
			height: this.height,
			width: this.width,
		});
		
		
		this._header = this._main.create("div").addClass("header");
		this._body = this._main.create("div").addClass("body");
		this._foot = this._main.create("div").addClass("foot");
		
	};
	
	
	Report.prototype = {
		addPage: function(opt){
			opt.target = $(this.main);
			this._page = this.p[this.pIndex++] = new Page(opt);
			this._page = this._page._body;
			
			
			var g = Float.getXY(this._page.get());
			
			this._page.get().style.maxHeight = g.height+"px";
			db(g.height)
			
		},
		
		
		addGroup: function(opt){
			opt.target = $(this.main);
			this._page = this.g[this.gIndex++] = new Group(opt);
			
			
			
			
		},
		
		add: function(data){
			var l = false, m = false, rxy = false, pxy, row = false, n = 0;
			
			var xy = Float.getXY(this._page.get());
			
			db(xy.height, "red")
			
			for(var x in data){
				
				
				if(x> 0 && x % 10 == 0){
					//this.addGroup({});	
				}
				
				//l = this._page._main.create("div").addClass("row");
				
				row = this._page.create("div").addClass("row");
				
				for(var y in data[x]){
					 
					n++;
					cell = row.create("div").addClass("cell").text(data[x][y]);
					
					
					
				}
				
				rxy = Float.getXY(cell.get());
				
				
				pxy = Float.getXY(this._page.get());
				if(rxy.height*n>xy.height){
					n=0;
					this.addPage({});
					this._page.append(row);
					
				}
				
				
				
			}
		
		
		},
		
	};
	
	
	
}(_sgQuery, _sgFloat, _sgDrag));

var r = new Report({
	main: "#main",
	
	
});

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
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	[
	465456,65465465,654654,'sadfsadf','sdf1321'
],
	
	
	
];

r.addPage({});
r.add(r.data);
