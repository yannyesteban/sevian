// JavaScript Document

if(!Sevian){
	var Sevian = {};
}
if(!Sevian.Input){
	Sevian.Input = {};
}

var Upload = false;


(function(namespace, $){
	

	
	Upload = function(opt){
		
		for(var x in opt){
			
			if(opt.hasOwnProperty(x)){
				
				this[x] = opt[x];
			}
			
		}
		
		
		if(this.target){
			this._target = $(this.target);
		}
		db(222)
		this.create();
		
	};
	
	
	Upload.prototype = {
		
		create: function(){
			if(!this.main){
				db(444)
				this.main = $.create("div");
				
				this.main.addClass("upload-main");
				
			}
			
			
			this.main
				.on("dragover", function(event){
				db(88888)
					event.preventDefault();
				})
				.on("drop", function(event){
					var files = event.dataTransfer.files;
				
				
				db(files[0]);
				
				for(var x in files[0]){
					
					db(x+"..."+files[x])
				}
				
					event.preventDefault();
				});
			
			
			
			if(this._target){
				
				
				this._target.append(this.main);
			}
		}
		
		
		
		
	};
	
	
}(Sevian, _sgQuery));
function l1(){
	
	var uu = new Upload({
		target: "main_upload",
		main: false,


	});
	
}


_sgQuery(window).on("load", l1);

	