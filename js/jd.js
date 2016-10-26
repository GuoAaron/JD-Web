/*
	@description 选择送至的城市
*/
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
		//事件代理
		/*$(".dropdown-layer").click(function(event){			
			$(this).find('a').removeClass('selected');
			$(event.target).not('div').addClass('selected');
			if($('.selected')){
				$('#area').html($('.selected').html()());
			}else{
				return;
			}
		});*/
		obj.nav.clickShutDwon("#shutdown","#top-banner");
		//查询系列事件
		var url = "../data/jdSerachData.json";
		var a = "#search input[type=text]";
		var c = "GET";
		var d = "json";
		obj.search.focus(a,url,c,d);				
	})();		
});
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
		}
	}
}
obj.test.log();