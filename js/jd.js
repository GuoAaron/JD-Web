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
		obj.search.focus("#search input[type=text]");		
	})();
});
var obj = {
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
		"focus": function(a,b,c,d){
			$(a).focus(function(){				
				this.placeholder = "";
				$(this).css("color","rgb(51,51,51)");
			});
			$(a).blur(function(){
				this.placeholder = "口袋投影";
				$(this).css("color","rgb(135,135,135)");
			});
			$(a).bind("input",function(){
				console.log(this.value);
				if(this.value){
					$.ajax({
						url: "../data/demo.json",
						type: "GET",
						data: "",
						dataType: "json",
						success: function(datas){
							debugger;
							JSON.parse(datas);//解析json数据
							JSON.stringify();//序列化对象或者数组为json类型数据
							console.log(datas);
							var data = eval();
							console.log(new Date().toJSON());
						},
						error: function(){
							console.log("request failed");
						}
					});
				}
			});							
		}
	}
}
obj.test.log();