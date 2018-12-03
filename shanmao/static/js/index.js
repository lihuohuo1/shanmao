$(function(){
	//是否有用户登录
	
	var url = window.location.search;
	if(url.length > 0){
		$(".info").css({"display":"none"});
		$(".member").css({"display":"block"})
		$(".login").css({"display":"none"});
		$(".isLogin").css({"display":"block"})
	}else{
		$(".info").css({"display":"block"});
		$(".member").css({"display":"none"})
		$(".login").css({"display":"block"});
		$(".isLogin").css({"display":"none"})
	}
	
	var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
	$('#uname').html("用户名："+loc);
	$(".uname").html("尊敬的"+loc+"用户，您好");
	
	$(".li_last,#li_last_nav ul").mouseenter(function(){
		$("#li_last_nav ul").show();
		$(".li_last").addClass("active")
	})
	$("#li_last_nav ul,.li_last").mouseleave(function(){
		$("#li_last_nav ul").hide();
		$(".li_last").removeClass("active")
	})	
	$(".header_nav li").mouseenter(function(){
		$(this).find("a").removeClass("active1").addClass("active1")
		.parent().siblings().find("a").removeClass("active1");
	})
	var bigImg = $(".bigImg");
	var bar = $(".bigImg_bar");
	var li1 = $(".bigImg li");
	var li2 = $(".bigImg_bar li");
	var cartspan = $(".cart_span")
	var shopcart = $("#shopCart")
	
	var index = 0;
	var length = li1.length;
	
	show();
	var timer;
	
	bigImg.on("mouseenter",function(){
		clearInterval(timer);
	}).on("mouseleave",function(){
		timer = setInterval(animation,3000);
	}).trigger("mouseleave");
	
	shopcart.mouseenter(function(){
		cartspan.css({"backgroundColor":"white","color":"#ec5151"})
	})
	shopcart.mouseleave(function(){
		cartspan.css({"backgroundColor":"#ec5151","color":"white"})
	})
	
	function animation(){
		index++;
		show();
	}
	
	
	//头部轮播图
	function show(){
		if(index == length){
			index = 0;
		}
		li1.eq(index).stop().animate({opacity : 1}).siblings().stop().animate({opacity : 0});
		li2.eq(index).removeClass("bigImg_bar_active").addClass("bigImg_bar_active").siblings().removeClass("bigImg_bar_active");
	}
	
	li2.click(function(){
		var i = $(this).index();
		index = i-1;
		animation();
	})
})

$(function(){
	var li = $(".smallImg li");
	var left = $(".left");
	var right = $(".right");
	var length = li.length;
	var i = 0;
	$(".smallImg").mouseenter(function(){
		show();
	})
	$(".smallImg").mouseleave(function(){
		left.hide();
		right.hide();
	})
	
	left.click(function(){
		i--;
		li.stop().animate({left:-i*243*3});
		show();
	})
	right.click(function(){
		i++;
		li.stop().animate({left:-i*243*3});
		show();
	})
	
	li.mouseenter(function(){
		$(this).find("a").stop().animate({opacity:1}).parent("li").siblings("li").find("a").stop().animate({opacity:0.5});
	})
	li.mouseleave(function(){
		li.find("a").stop().animate({opacity:1});
	})
	
	function show(){
		if(i<=0){
			left.hide();
			right.show();
		}
		if(i >= 2){
			left.show();
			right.hide();
		}
		if(i < 2 && i > 0){
			left.show();
			right.show();
		}
	}
	
	function ad(){
		var tabs = $(".ad h2");
		var tabs_p1 = $(".tabs_p1");
		var tabs_p2 = $(".tabs_p2");
		tabs.mouseenter(function(){
			$(this).removeClass("tab").addClass("tab").siblings().removeClass("tab");
			var index = $(this).index();
			if(index == 0){
				tabs_p1.show();
				tabs_p2.hide();
			}else if(index ==1){
				tabs_p1.hide();
				tabs_p2.show();
			}
		})
	}
	ad();
	
	function hot(){
		index = 0;
		var hot = $(".hot_title li");
		var i = $(".hot_title i")
		var item = $(".done-item")
		hot.click(function(){
			var index = $(this).index();
			$(this).removeClass("on").addClass("on").siblings().removeClass("on");
			i.stop().animate({left:index*106},"slow");
			item.stop().eq(index).fadeIn("fast").siblings().stop().fadeOut("fast");
		})
	}
	hot();
	
	function done(){
		var ul = $(".done_item_ul")
		var li = $(".done-item_ul li");
		var left = $(".done_left");
		var right = $(".done_right");
		var length = li.length;
		var i = 0;
		$(".tempWrap").mouseenter(function(){
			show();
		})
		$(".tempWrap").mouseleave(function(){
			left.hide();
			right.hide();
		})
		
		left.click(function(){
			i--;
			ul.stop().animate({left:-i*184},"slow");
			show();
		})
		right.click(function(){
			i++;
			ul.stop().animate({left:-i*184},"slow");
			show();
		})
		
		function show(){
			if(i<=0){
				left.hide();
				right.show();
			}
			if(i >= 5){
				left.show();
				right.hide();
			}
			if(i < 5 && i > 0){
				left.show();
				right.show();
			}
		}
	}
	done();
	
	function group(){
		var ul = $(".temp ul")
		var li = $(".temp li");
		var left = $(".group_left");
		var right = $(".group_right");
		var length = li.length;
		var i = 0;
		$(".temp").mouseenter(function(){
			show();
		})
		$(".temp").mouseleave(function(){
			left.hide();
			right.hide();
		})
		
		left.click(function(){
			i--;
			ul.stop().animate({left:-i*240},"slow");
			show();
		})
		right.click(function(){
			i++;
			ul.stop().animate({left:-i*240},"slow");
			show();
		})
		
		function show(){
			if(i<=0){
				left.hide();
				right.show();
			}
			if(i >= length-1){
				left.show();
				right.hide();
			}
			if(i < length-1 && i > 0){
				left.show();
				right.show();
			}
		}
	}
	group();
	
	function lunbo(){
		$.getJSON("js/index.json",function(data){
			for (var i = 0;i<data.length;i++) {
				var obj = data[i];				
				var li = $("<li><a href='#'><img src=" + obj.img + "/></a></li>");
				li.css({"width":"275px"})
				$(".bd_list").append(li);
			}
			$(".bd_list li").first().clone().appendTo(".bd_list");
			var size = $(".bd_list li").length;
			var i = 0;
			var timer = window.setInterval(function(){
				i++;
				lunmove();
			},2000);
			
			function lunmove(){
				if(i < 0){
					$(".bd_list").css("left",-(size-1)*275);
					i = size -2
				}
				if(i >= size){
					$(".bd_list").css("left",0);
					i = 1;
				}
				$(".bd_list").stop().animate({left:-275*i},500);
				$(".hd li").eq(i).removeClass("on").addClass("on").siblings().removeClass("on");
				if(i >= size-1){
					$(".hd li").eq(0).removeClass("on").addClass("on").siblings().removeClass("on");
				}
			}
			
			$(".hd li").mouseenter(function(){
				clearInterval(timer);
				var index = $(this).index();
				i = index;
				lunmove();
			})
			
			$(".brand_adv").on("mouseenter",function(){
				window.clearInterval(timer);
			}).on("mouseleave",function(){
				window.clearInterval(timer);
				//切记之前已经定义了timer，这里不能写成var timer，否则速度会变快
				timer = window.setInterval(function(){
					i++;
					lunmove();
				},2000)
				console.log(timer);
			})
		})		
	}
	lunbo();
	
	function tabs(){
		var li = $(".code_tabs li");
		var contant = $(".tabs_contant div");
		li.mouseenter(function(){
			var index = $(this).index();
			$(this).removeClass("ecjia").addClass("ecjia").siblings().removeClass("ecjia")
			contant.eq(index).show().siblings().hide();
		})
	}
	tabs();
	
	//右边侧栏
	function links(){
		var show = $(".show");
		var tips = $(".tips");
		var user = $(".user");
		var shopcart = $("#shopCart");
		var cartlist = $(".cart_list");
		var information = $(".information");
		var quick_links = $(".quick_links");
		var down = $(".down");	
		show.mouseenter(function(){
			var index = $(this).index();
			tips.stop().eq(index-2).show().animate({left:-92});
		})
		show.mouseleave(function(){
			tips.hide().css({left:-121});
		})
		$("#show").mouseenter(function(){
			var index = $(this).index();
			$("#tips").stop().show().animate({left:-92});
			tips.eq(index-2).hide();
		})
		$(".user,.user_info").mouseenter(function(){
			$(".user_info").show();
		})
		$(".user,.user_info").mouseleave(function(){
			$(".user_info").hide();
		})	
		shopcart.click(function(){					
			if(cartlist.is(":hidden"))
			{
				information.animate({width:320});
				$(".quick_link").animate({right:280});
				cartlist.css({"display":"block"});
			}else if(cartlist.is(":visible")){
				information.animate({width:40});
				$(".quick_link").animate({right:0},function(){
					cartlist.css({"display":"none"})
				});
			}
		})
		$(".close").click(function(){
			information.animate({width:40});
				$(".quick_link").animate({right:0},function(){
					cartlist.css({"display":"none"})
				});
		})
	}
	links()
	
	function slidebar(){
		$(".clannels a").mouseenter(function(){
			$(this).css({"background":"#ec5051"});
			$(this).find("i").css({"background":"#e23435"})
		})
		$(".clannels a").mouseleave(function(){
			$(this).css({"background":"#7c7171"});
			$(this).find("i").css({"background":"#5c5251"})
		})
		var sidebar_t = $(".sidebar div")
			$(".sidebar div").mouseenter(function(){
				var index = $(this).index();
				$(this).removeClass("hclass").addClass("hclass").siblings().removeClass("hclass");
				$(this).find("a").css({"color":"#ec5051"})
				$(".sidebar_contant").eq(index).show();
				$(".sidebar_contant").mouseenter(function(){
					$(this).show();
					sidebar_t.eq(index).removeClass("hclass").addClass("hclass").siblings().removeClass("hclass");
					sidebar_t.eq(index).find("a").css({"color":"#ec5051"}).parent().parent().siblings().find("a").css({"color":"white"})
				})
			})
			$(".sidebar_name").mouseleave(function(){
				var index = $(this).index();
				$(".sidebar_contant").eq(index).hide();
				sidebar_t.eq(index).removeClass("hclass");
				sidebar_t.eq(index).find("a").css({"color":"white"})
				$(".sidebar_contant").mouseleave(function(){
					$(".sidebar_contant").hide();
					sidebar_t.eq(index).removeClass("hclass");
					sidebar_t.eq(index).find("a").css({"color":"white"})
				})
			})
	}
	slidebar()
	
	//floot轮播图
	function floot(){
		$.getJSON("js/floot.json",function(data){
			for(var i = 0;i < data.length;i++){
				var obj = data[i];				
				var li = $("<li><a href='#'><img src=" +obj.img+ "/ alt = ''></a></li>");
				li.css({"width":"342px"})
				$("#tempW_ul").append(li);
			}
			$("#tempW_ul li").first().clone().appendTo("#tempW_ul")
			var $ul = $("#tempW_ul");
			var $li = $("#tempW_ul li")
			var $bar = $("#tempW_bar li")
			var size = $li.length;
			var i = 0;
			var timer = window.setInterval(function(){
				i++;
				flootmove();
			},2100)
			
			function flootmove(){
				if(i < 0){
					$ul.css("left",-(size-1)*342);
					i = size - 2; 
				}
				if(i >= size){
					$ul.css("left",0);
					i = 1;
				}
				$ul.stop().animate({left:-342*i},500);
				$bar.eq(i).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				if(i >= size -1){
					$bar.eq(0).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				}
			}
			
			$(".tempW").on("mouseenter",function(){
				clearInterval(timer);
			}).on("mouseleave",function(){
				clearInterval(timer);
				timer = window.setInterval(function(){
					i++;
					flootmove();
				},2100)
			})
			
			$bar.mouseenter(function(){
				var index = $(this).index();
				i = index;
				flootmove();
			})
		})
	}
	floot()
	
	function floot2(){
		$.getJSON("js/floot.json",function(data){
			for(var i = 0;i < data.length;i++){
				var obj = data[i];				
				var li = $("<li><a href='#'><img src=" +obj.img+ "/ alt = ''></a></li>");
				li.css({"width":"342px"})
				$("#tempW_ul_2").append(li);
			}
			$("#tempW_ul_2 li").first().clone().appendTo("#tempW_ul_2")
			var $ul = $("#tempW_ul_2");
			var $li = $("#tempW_ul_2 li")
			var $bar = $("#tempW_bar_2 li")
			var size = $li.length;
			var i = 0;
			var timer = window.setInterval(function(){
				i++;
				flootmove();
			},2200)
			
			function flootmove(){
				if(i < 0){
					$ul.css("left",-(size-1)*342);
					i = size - 2; 
				}
				if(i >= size){
					$ul.css("left",0);
					i = 1;
				}
				$ul.stop().animate({left:-342*i},500);
				$bar.eq(i).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				if(i >= size -1){
					$bar.eq(0).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				}
			}
			
			$(".tempW").on("mouseenter",function(){
				clearInterval(timer);
			}).on("mouseleave",function(){
				clearInterval(timer);
				timer = window.setInterval(function(){
					i++;
					flootmove();
				},2200)
			})
			
			$bar.mouseenter(function(){
				var index = $(this).index();
				i = index;
				flootmove();
			})
		})
	}
	floot2()
	
	function floot3(){
		$.getJSON("json/drink.json",function(data){
			for(var i = 0;i < data.length;i++){
				var obj = data[i];				
				var li = $("<li><a href='#'><img src=" +obj.img+ "/ alt = ''></a></li>");
				li.css({"width":"342px"})
				$("#tempW_ul_3").append(li);
			}
			$("#tempW_ul_3 li").first().clone().appendTo("#tempW_ul_3")
			var $ul = $("#tempW_ul_3");
			var $li = $("#tempW_ul_3 li")
			var $bar = $("#tempW_bar_3 li")
			var size = $li.length;
			var i = 0;
			var timer = window.setInterval(function(){
				i++;
				flootmove();
			},2000)
			
			function flootmove(){
				if(i < 0){
					$ul.css("left",-(size-1)*342);
					i = size - 2; 
				}
				if(i >= size){
					$ul.css("left",0);
					i = 1;
				}
				$ul.stop().animate({left:-342*i},500);
				$bar.eq(i).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				if(i >= size -1){
					$bar.eq(0).removeClass("enter").addClass("enter").siblings().removeClass("enter");
				}
			}
			
			$(".tempW").on("mouseenter",function(){
				clearInterval(timer);
			}).on("mouseleave",function(){
				clearInterval(timer);
				timer = window.setInterval(function(){
					i++;
					flootmove();
				},2000)
			})
			
			$bar.mouseenter(function(){
				var index = $(this).index();
				i = index;
				flootmove();
			})
		})
	}
	floot3()
	
	
	
	//floot轮播图商品列表
	function banner(){
		var li1 = $("#nav_1 ul li");
		var dd1 = $("#nav_1 dl dd");
		var item = $("#nav_1 .item");
		li1.mouseenter(function(){
			var index = $(this).index();
			dd1.eq(index).css({"background":"none"});
			$("#nav_1 .items").eq(index).show();
		})
		li1.mouseleave(function(){
			var index = $(this).index();
			dd1.eq(index).css({"background":"#fff"});
			$("#nav_1 .items").eq(index).hide();
		})
		item.on("mouseenter",function(){
			$(this).find("a").css({"color":"#ec5051"});
		}).on("mouseleave",function(){
			$(this).find("a").css({"color":"#000"});
		})
	}
	banner();
	
	function banner2(){
		var li2 = $("#nav_2 ul li");
		var dd2 = $("#nav_2 dl dd");
		var item = $("#nav_2 .item");
		li2.mouseenter(function(){
			var index = $(this).index();
			dd2.eq(index).css({"background":"none"});
			$("#nav_2 .items").eq(index).show();
		})
		li2.mouseleave(function(){
			var index = $(this).index();
			dd2.eq(index).css({"background":"#fff"});
			$("#nav_2 .items").eq(index).hide();
		})
		item.on("mouseenter",function(){
			$(this).find("a").css({"color":"#ec5051"});
		}).on("mouseleave",function(){
			$(this).find("a").css({"color":"#000"});
		})
	}
	banner2();
	
	function banner3(){
		var li3 = $("#nav_3 ul li");
		var dd3 = $("#nav_3 dl dd");
		var item = $("#nav_3 .item");
		li3.mouseenter(function(){
			var index = $(this).index();
			dd3.eq(index).css({"background":"none"});
			$("#nav_3 .items").eq(index).show();
		})
		li3.mouseleave(function(){
			var index = $(this).index();
			dd3.eq(index).css({"background":"#fff"});
			$("#nav_3 .items").eq(index).hide();
		})
		item.on("mouseenter",function(){
			$(this).find("a").css({"color":"#ec5051"});
		}).on("mouseleave",function(){
			$(this).find("a").css({"color":"#000"});
		})
	}
	banner3();
	
	//floot广告翻页
	function next(){
		var next = $(".next");
		var prev = $(".prev");
		var logo = $(".banner_logos");
		var size = parseInt($(".banner_logos").width()/$(".floot_right_banner").width());
		var i = 0;
		next.click(function(){
			i++;
			logoMove();
		})
		prev.click(function(){
			i--;
			console.log(i);
			logoMove();
		})
		function logoMove(){
			logo.stop().animate({left:-118*i});
			if(i <= 0){
				prev.hide();
				next.show();
			}else if(i >= size-1){
				next.hide();
				prev.show();
			}
		}
		$(".floot_right_banner").on("mouseenter",function(){
			logoMove();
		}).on("mouseleave",function(){
			next.hide();
			prev.hide();
		})
	}
	next();
	
	//楼梯
	function elevator(){
		var floot1 = $("#floot_1").offset().top - 110;
		var floot = $(".floot");
		var li = $(".elevator ul li")
		var guess = $(".guess").offset().top;
		var isMoving = false;
		
		li.click(function(){
			var index = $(this).index();
			var _top = floot.eq(index).offset().top;
			isMoving = true;
			$("body,html").stop().animate({scrollTop:_top},1000,function(){
				isMoving = false;
			})
			$(this).css({"background":"#ec5051"}).siblings().css({"background":"#bfbfbf"})
		})
		
		$(window).scroll(function(){
			var top = $(document).scrollTop();	
			if(top >= floot1 && top < guess){
				$(".elevator").css({opacity:1});
			}else if(top < floot1 || top >= guess){
				$(".elevator").css({opacity:0});
			}
			if(!isMoving){
				floot.each(function(i,ele){
					var _top = $(this).offset().top;
					if( (_top - $(this).height()/2) <= top){
						index = i;
					}
				})
				li.eq(index).css({"background":"#ec5051"}).siblings().css({"background":"#bfbfbf"})
			}
		})
	}
	elevator();
	
	//猜你喜欢
	function product(){
		var $p = $(".product_item");
		var $box = $(".box");
		$p.on("mouseenter",function(){
			var index = $(this).index();
			$box.eq(index).stop().animate({left:0},"fast").siblings().stop().animate({left:-110},"fast")
		}).on("mouseleave",function(){
			var index = $(this).index();
			$box.eq(index).stop().animate({left:-110},"fast")
		})
	}
	product();
	
	//一楼右侧
	function ecse(){
		$.getJSON("js/goods.json",function(data){
			for(var i = 0;i <data.length;i++){
				var obj = data[i];
				var li = $("<li></li>");
				var img = $("<a href='#'><img src=" +obj.img+ " alt = '' /></a>")
				var information = $("<a href='#'>" +obj.information+ "</a>")
				var rmb = $("<em>" + obj.RMB + "</em>")
				var price = $("<span>" + obj.price + "</span>")
				var original = $("<span>" + obj.original + "</span>")
				information.css({"display":"block","overflow":"hidden","height":"36px","color":"black","padding-top":"10px"})
				rmb.css({"font-size":"12px","color":"#ec5051","padding-bottom":"1px"})
				price.css({"color":"#ec5051","font-size":"18px","margin-top":"15px","padding-left":"0px"})
				original.css({"color":"#666","font-size":"12px","text-decoration":"line-through","padding-left":"6px"})
				li.append(img,information,rmb,price,original)
				$(".ecsc_main").append(li);
			}
			$(".ecsc_main li").on("mouseenter",function(){
				$(this).stop().animate({"opacity":1}).siblings().stop().animate({"opacity":0.5})
			}).on("mouseleave",function(){
				$(".ecsc_main li").stop().animate({"opacity":1})
			})
		})
		
		$(".floot_bottom ul li").on("mouseenter",function(){
				$(this).stop().animate({"opacity":1}).siblings().stop().animate({"opacity":0.5})
			}).on("mouseleave",function(){
				$(".floot_bottom ul li").stop().animate({"opacity":1})
			})
	}
	ecse()
	
	//三楼右侧
	function three(){
		$.getJSON("json/food.json",function(data){
			for(var i = 0;i <data.length;i++){
				var obj = data[i];
				var li = $("<li></li>");
				var img = $("<a href='#'><img src=" +obj.img+ " alt = '' /></a>")
				var information = $("<a href='#'>" +obj.information+ "</a>")
				var rmb = $("<em>" + obj.RMB + "</em>")
				var price = $("<span>" + obj.price + "</span>")
				var original = $("<span>" + obj.original + "</span>")
				information.css({"display":"block","overflow":"hidden","height":"36px","color":"black","padding-top":"10px"})
				rmb.css({"font-size":"12px","color":"#ec5051","padding-bottom":"1px"})
				price.css({"color":"#ec5051","font-size":"18px","margin-top":"15px","padding-left":"0px"})
				original.css({"color":"#666","font-size":"12px","text-decoration":"line-through","padding-left":"6px"})
				li.append(img,information,rmb,price,original)
				$("#demo").append(li);
			}
			$("#demo li").on("mouseenter",function(){
				$(this).stop().animate({"opacity":1}).siblings().stop().animate({"opacity":0.5})
			}).on("mouseleave",function(){
				$("#demo li").stop().animate({"opacity":1})
			})
		})
		
		$(".floot_bottom ul li").on("mouseenter",function(){
				$(this).stop().animate({"opacity":1}).siblings().stop().animate({"opacity":0.5})
			}).on("mouseleave",function(){
				$(".floot_bottom ul li").stop().animate({"opacity":1})
			})
	}
	three()
	
	//floot标题tab
	function tab(){
		$("#floot_1 .floot_tab li").on("mouseenter",function(){
			var index = $(this).index();
			$(this).removeClass("on").addClass("on").siblings().removeClass("on")
			$(this).find("em").css({"display":"block"}).parent().siblings().find("em").css({"display":"none"})
			$(".floot_right").eq(index).stop().fadeIn("fast").siblings().stop().fadeOut("fast");
		})
		$("#floot_2 .floot_tab li").on("mouseenter",function(){
			var index = $(this).index();
			$(this).removeClass("on").addClass("on").siblings().removeClass("on")
			$(this).find("em").css({"display":"block"}).parent().siblings().find("em").css({"display":"none"})
			$("#floot_2 .floot_right").eq(index).stop().fadeIn("fast").siblings().stop().fadeOut("fast");
		})
		$("#floot_3 .floot_tab li").on("mouseenter",function(){
			var index = $(this).index();
			$(this).removeClass("on").addClass("on").siblings().removeClass("on")
			$(this).find("em").css({"display":"block"}).parent().siblings().find("em").css({"display":"none"})
			$("#floot_3 .floot_right").eq(index).stop().fadeIn("fast").siblings().stop().fadeOut("fast");
		})
	}
	tab()
})
