/*********************************jd navigation and search***********************************************/
$(function(){
	var selectCity = (function(){
		//li标签
		var $cityContext = $("#ttbar-mycity");
		//省份列表div
		var $cityList = $(".dropdown-layer");
		//具体省份的a标签
		var $items = $(".item>a",$cityContext);
		//
		var $city = $(".cw-icon",$cityContext);		
		obj.nav.mouseShowEvent("#ttbar-mycity", "#ttbar-mycity .dropdown-layer");
		obj.nav.mouseShowEvent("#ttbar-myjd", "#ttbar-myjd .dropdown-layer");
		obj.nav.mouseShowEvent("#ttbar-apps", "#ttbar-apps .dropdown-layer");
		obj.nav.mouseShowEvent("#ttbar-atte", "#ttbar-atte .dropdown-layer");
		obj.nav.mouseShowEvent("#ttbar-serv", "#ttbar-serv .dropdown-layer");
		obj.nav.mouseShowEvent("#ttbar-navs", "#ttbar-navs .dropdown-layer");		
		//具体省份click事件
		for (var i = 0; i < $items.length; i++) {								
			$items.eq(i).on("click", function(){
				$("#area-city").text($(this).text());
				$("#ttbar-mycity .item a").removeClass("selected");
				$("#area-city").attr({"data-id": this.dataset.id,"title": $(this).text()});
				$(this).removeClass("hover").addClass("selected");				
			});
		}
		$("#ttbar-mycity .item a").hover(function(){
			if(!($(this).hasClass("selected"))){
				$(this).addClass("hover");
			}			
			},function(){
				$(this).removeClass("hover");
		});		
		obj.nav.clickShutDwon("#shutdown","#top-banner");
		//查询系列事件
		var url = "../data/jdSerachData.json";
		var a = "#search input[type=text]";
		var c = "GET";
		var d = "json";
		obj.search.focus(a,url,c,d);
		//shopping cart event
		obj.search.showOrhide("#cart",".cart-spacer",".cart-content");
		//						
	})();
	var hover = {
		trigger: ".basic-shop-item",
		change: ".shop-show",
		fontColor: "font-col",
		bgdColor: "bgd-white",
		show: "display",
		hide: "hidden"
	}

	obj.shopSort.hover(hover);		
});
var f = {
	"isFunction": function(a){
		return "function" === typeof a;
	},
	"isArray": Array.isArray || function(a){
		return "array" === typeof a;
	},
	"isWindow": function(a){
		return a && "object" == a && "setInterval" in a;
	},
	"addClass": function(a){

	},
	"removeClass": function(a){
		var c, d, e, g, h, i, j;
		if (f.isFunction(a)){
			return this.each(function(b){
				$(this).removeClass(a.call(this,b,this.className));
			});
		}
	}
}
var obj = {
	"readJsonFile": function (url,val,c,d,i) {
		if(val){
			$.ajax({
				url: url,
				type: c,
				dataType: d,
				success: function(datas){
					JSON.stringify();//序列化对象或者数组为json类型数据
					for(var data in datas){
						var regexp = new RegExp(datas[data].key);								
						if(regexp.test(val)){
							obj.search.xrlist(datas[data].value,datas[data].value.length);
							$(i).show();
							break;
						}
					}
				},
				error: function(){
					console.log("request failed");
				}
			});
		}
	},
	"clickItem": function(a){		
		console.log(a);
		if ($("#search input[type=text]").val()) {
			$("#search input[type=text]").val("");
		}
		$("#search input[type=text]").val(a.title);
	},	
	"nav": {
		"preloadImages": function(){
			$(arguments[0]).attr("src", arguments[1]);		
		},
		"mouseShowEvent": function(liID,show){
			var flag = 0;
			var flag1 = 0;
			$(liID).mouseenter(function(){	
				flag = 1;
				$(liID).find(".ci-right>s").css("top","-1px");
				$(liID).removeClass("li-style-recover").addClass("li-style-trans");			
					$(show).show();
			});
			$(liID).mouseleave(function(){
				flag = 2;
				if(flag === 2 && flag1 === 0){
					$(show).hide();
					$(liID).find(".ci-right>s").css("top","-7px");
					$(liID).removeClass("li-style-trans").addClass("li-style-recover");				
					flag = 0;
				}else if(flag === 2 && flag1 === 2){
					$(show).hide();
					$(liID).find(".ci-right>s").css("top","-7px");
					$(liID).removeClass("li-style-trans").addClass("li-style-recover");				
					flag = 0;
				}
			});
			$(show).mouseleave(function(){
				flag1 = 2;
				if(flag === 2 && flag1 === 1){

				}else if(flag === 2 && flag1 === 2){
					$(liID).find(".ci-right>s").css("top","-7px");
					$(liID).removeClass("li-style-trans").addClass("li-style-recover");
					flag1 = 0;
					$(show).hide();
				}
			});
		},
		"clickShutDwon": function(a,b,c,d){
			$(a).click(function(){
				$(b).hide();
			});
		}		
	},	
	"test": {
		"log": function(){
			console.log("test Object writing format ");
		}
	},
	"search": {
		"xrlist": function(data,datanum){
			$("#sheple").empty();
			if(datanum != "undefined" && datanum <= data.length){
				datanum = datanum;
			}else{
				datanum = data.length;
			}			
			for (var i = 0; i < datanum; i++) {
			if(i === datanum-1){
				$("#sheple").append("<hr/><li title'关闭'><div id='close'>关闭</div></li>");
				obj.nav.clickShutDwon("#close","#sheple");
				break;
			}			
				$("#sheple").append("<li class='xrshow' title='"+data[i]+"' onclick='obj.clickItem(this)'>"+data[i]+"</li>");
			}
		},
		"focus": function(a,b,c,d){
			$(a).focus(function(){
				$(this).css("color","rgb(51,51,51)");
				debugger;
				if (this.value) {
					obj.readJsonFile(b,this.value,c,d,"#sheple");
				}else{					
					this.placeholder = "";
				}				
			});
			$(a).blur(function(){
				var flag = false;
				/*$("#sheple").mouseover(function(event){
					flag = true;
					console.log("asdfg");
				});*/
				/*if (!flag) {
					$("#sheple").hide();
					$("#sheple").empty();				
				}*/
				if (!this.value) {
					$(this).css("color","rgb(135,135,135)");
					this.placeholder = "口袋投影";			
				}
			});
			$(a).bind("input",function(){
				obj.readJsonFile(b,this.value,c,d,"#sheple");				
			});							
		},
		"show": function(){
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i]) {
					$(arguments[i]).show();
				}
			}			
		},
		"hide": function(){
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i]) {
					$(arguments[i]).hide();
				}
			}			
		},
		"showOrhide": function(e,f,g){
			if (e) {
				$(e).on("mouseenter",function(){
					obj.search.show(f,g);
				});
				$(e).on("mouseleave",function() {
					obj.search.hide(f,g);
				});
			}
		}
	}
}
/***********************************shop sort module******************************************/
obj.shopSort = {
	"hover": function(o){
		console.log(o);
		$(o.trigger).hover(function(){
			$(this).addClass(o.bgdColor);
			$(this).children().addClass(o.fontColor);			
			$(o.change).eq($(this).index()).addClass(o.show).siblings().removeClass(o.show);
		},function(){
			$(this).removeClass(o.bgdColor);
			$(this).children().removeClass(o.fontColor);
			$(o.change).removeClass(o.show);
		});
	}
}
/**********************************picture slide**********************************************/
var imgs = [
	{"i":0,src:"../images/carousel1.jpg"},
	{"i":1,src:"../images/carousel2.jpg"},
	{"i":2,src:"../images/carousel3.jpg"},
	{"i":3,src:"../images/carousel4.jpg"},
	{"i":4,src:"../images/carousel5.jpg"}
]
picSlide = {
	WIDTH: 730,
	WAIT: 3000,
	STEPS: 300,
	AUTOMOVE: true,
	timer: null,
	index: null,
	init: function(){
		var me = this;
		me.viewPoint();
		$(".carousel-images").mouseenter(function(){
			me.AUTOMOVE = false;
			//$(".moveBtn").show();			
		});
		$(".carousel-images").mouseleave(function(){
			me.AUTOMOVE = true;
			//$(".moveBtn").hide();			
		});
		me.autoPlay();
		/*$(".carousel-index").click(function(e){
			var target = e.target || e.srcElement;
			console.log(target.className);
			console.log($(target).html());
			if (target.className == "li-index") {
				$(".carousel-index>.active").removeClass("active");
				$(target).addClass("active");
				var n = $(target).html()-1-imgs[0].i;
				me.move(n);
			}
		});*/
		$(".moveBtn").hover(function(){
			$(".moveBtn").addClass("bgd-black");
		},function(){
			$(".moveBtn").removeClass("bgd-black");
		});
		$("span.lf").click(function(){
			me.move(-1);
		});
		$("span.rt").click(function(){
			me.move(1);
		});				
	},
	viewPoint: function(){
		var me = this;
		for (var i = 0,lis = [],idex = []; i < imgs.length; i++) {
			lis[i] = "<li class='slide-item'><a href='javascript:void(0);'><img src="+imgs[i].src+"></a></li>";
			idex[i] = "<li class='li-index'>"+(i+1)+"</li>";
		}
		$(".carousel-images").html(lis.join(""));
		$(".carousel-index").html(idex.join(""));
		$(".carousel-index>.active").removeClass("active");
		$(".carousel-index>li")[imgs[0].i].className = "active";
		$(".carousel-images>slide-item").removeClass("display");
		$(".carousel-images>li").eq(me.index).addClass("display");
	},
	move: function(n){
		clearInterval(this.timer);
		this.timer = null;
		var me = this;
		console.log(me.index);
		me.index = me.index + n;
		if (me.index < 0) {
			me.index = imgs.length - 1;
		}else if(me.index === imgs.length) {
			me.index = 0;
		}
		$(".carousel-images>li").eq(me.index).addClass("display").siblings().removeClass("display");
		$(".carousel-index>li").eq(me.index).addClass("active").siblings().removeClass("active");
		me.autoPlay();
	},
	autoPlay: function(n){
		var me = this;
		if (me.index === null) {
			me.index = 0;
		}		
		me.timer = setInterval(function(){
			if (me.AUTOMOVE) {
				me.index++;
				if (me.index === imgs.length) {
					me.index = 0;
				}
				$(".carousel-images>li").eq(me.index).addClass("display").siblings().removeClass("display");
				$(".carousel-index>li").eq(me.index).addClass("active").siblings().removeClass("active");
			}
		},me.WAIT);
	}
};
$(function(){
	picSlide.init();
});
/*****************************jd notice and fast in right-nav********************************************/
function a(){}
var notice = {
	"proinfo": {
		"prom": ".prom-item",
		"post": ".post-item",
		"index": ".notice-move-index",
		"prom_show": ".prom-notice",
		"post_show": ".post-notice",
		"service_ico": ".service-head",
		"service_online": ".service-online",
		"service_pop": ".service_pop",
		"service_show": ".service_show",
		"close": ".service_close",
		"display": "display",
		"cursor": "cursor",
		"cz": {
			"cz_item": ".cz_item",
			"intface": ".cz_interface"
		},
		"jp": {
			"jp_item": ".jp_item",
			"intface": ".jp_interface"
		},
		"dy": {
			"dy_item": ".dy_item",
			"intface": ".dy_interface"
		}	
	},
	init: function(){
		var me = this;
		var news = this.proinfo;
		var cz = this.proinfo.cz;
		var jp = this.proinfo.jp;
		var dy = this.proinfo.dy;
		console.log(cz);
		me.hover(news.prom,news.post,news.index,news.prom_show,news.post_show);
		me.service(news.service_ico,news.service_online,news.service_pop,news.service_show,news.display);
		me.click(news.close,news.service_pop,news.service_ico);
		$(".service_close").click(function(e){
			console.log("this is close");
			$(".service_pop").css("display","none");
		});
		me.mouseEvent(cz.cz_item,news.cursor,cz.intface,news.display);
		me.mouseEvent(jp.jp_item,news.cursor,jp.intface,news.display);
		me.mouseEvent(dy.dy_item,news.cursor,dy.intface,news.display);
	},
	/*notice mouse event*/
	hover: function(a,c,d,e,f){
		$(a).mouseover(function(){
			$(d).addClass("move-index0").removeClass("move-index");
			obj.search.show(e);
			obj.search.hide(f);
		});
		$(c).mouseover(function(){
			$(d).addClass("move-index").removeClass("move-index0");
			obj.search.show(f);
			obj.search.hide(e);
		});
	},
	mouseEvent: function(a,c,d,e){
		var lis = $(a);
		for (var i = 0; i < lis.length; i++) {
			lis.eq(i).mouseenter(function(){
				if (!($(this).hasClass(c))) {
					$(this).addClass(c).siblings().removeClass(c);
					$(d).eq($(this).index()).addClass(e).siblings().removeClass(e);
				}
			});
		}
	},
	service: function(q,w,e,r,t){
		var lis = $(q);
		var len = 47;
		for (var i = 0; i < lis.length; i++) {
			lis.eq(i).mouseenter(function(){				
				obj.search.show(w);
				$(w).css("transform","translateX("+$(this).index()*len+"px)");
				obj.search.show(e);
				$(r).eq($(this).index()).addClass(t).siblings().removeClass(t);
				/*$(q).slideUp();*/
				// $(q).animate({height: "30px"});
				$(".blockTop").animate({top: "-30px"},1000).css("top",-30);
			});
		}
	},
	click: function(w,e,q){
		$(w).click(function(){
			$(e).hide();
			// $(q).slideDown();			
			$(".blockTop").animate({top: "0px"},1000);
		});
	}	
};
$(function(){
	notice.init();
});
obj.test.log();