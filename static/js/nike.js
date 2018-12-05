$(function(e) {
	//放大镜
	function magic() {
		var smallImg = $(".picture a");
		var smallArea = $(".magic_small");
		var img = $(".goodImg").clone()
		var bigImg = img.appendTo($("#big_img"));
		var bigArea = $(".magic_box");
		smallArea.width(smallImg.width() / bigImg.width() * bigArea.width());
		smallArea.height(smallImg.height() / bigImg.height() * bigArea.height());

		var cale = bigImg.width() / smallImg.width();
		bigArea.mouseenter(function() {
			bigArea.hide();
		})
		smallImg.mousemove(function(e) {
			bigArea.show()
			var leftSide = smallImg.offset().left;
			var rightSide = leftSide + smallImg.width();
			var topSide = smallImg.offset().top;
			var bottomSide = topSide + smallImg.height();
			if(e.pageX > leftSide && e.pageX <= rightSide && e.pageY < bottomSide && e.pageY > topSide) {
				smallArea.show();
				e.preventDefault();
				var x = e.pageX - leftSide - smallArea.width() / 2;
				var y = e.pageY - topSide - smallArea.height() / 2;

				if(x <= 0) {
					x = 0;
				} else if(x >= smallImg.width() - smallArea.width()) {
					x = smallImg.width() - smallArea.width();
				}
				if(y <= 0) {
					y = 0;
				} else if(y >= smallImg.height() - smallArea.height()) {
					y = smallImg.height() - smallArea.height();
				}

				smallArea.css({
					left: x,
					top: y
				});
				bigImg.css({
					left: -x * cale,
					top: -y * cale
				});
			}
			smallImg.mouseleave(function() {
				smallArea.hide();
				bigArea.hide();
			})
		})
	}
	magic()

	//商品图片飞向购物车
	function fly() {
		$(".append").click(function(e) {
			var i = 0;
			var flyer = $("<img class='u-flyer'/>");
			flyer.attr("src", "img/nike/444_P_1450995273861.jpg");
			flyer.fly({
				start: {
					left: e.pageX,
					top: e.pageY,
					width: 90,
					height: 90
				},
				end: {
					left: $("#shopCart").offset().left,
					top: $("#shopCart").offset().top,
					width: 0,
					height: 0
				},
				onEnd: function() {
					if(confirm("宝贝已成功添加到购物车！是否继续购买？"))
				        {
				          	window.location.href = "#";
				        }
				        else 
				        {
				         	window.location.href = "http://127.0.0.1:8020/shanmao/balance.html";
				        }
				}
			})
		})
	}
	fly();

	//商品加入购物车
	function addTo() {
		var goodNum = $(".cart_span").html();
		var goodId = $(".goodId").html();
		var goodName = $(".name h1").html();
		var goodPicture = $(".spec_items").find("img");
		var copyImg = goodPicture.clone();
		var goodPrice = $(".goodPrice").find("i").html();
		$(".append").click(function() {
			$(".noGoods").hide();
			$(".goods_list").show();
			var goods = $.cookie("cart") ? JSON.parse($.cookie("cart")) : []

			var isTrue = false;
			for(var i = 0; i < goods.length; i++) {
				if(goodId == goods[i].id) {
					goods[i].num++;
					goodNum++;
					isTrue = true;
				}
			}
			if(!isTrue) {
				var good = {
					id: goodId,
					name: goodName,
					price: goodPrice,
					num: 1,
					img: goodPicture.attr("src")
				}
				goodNum++;
				goods.push(good);
			}

			$.cookie("cart", JSON.stringify(goods), {
				expires: 1,
				path: "/"
			});
			refresh();
			console.log($.cookie("cart"));
		})

		var goods = $.cookie("cart");
		if(goods) {
			refresh()
		}

		function refresh() {
			var ul = $(".list").empty();
			var goods = $.cookie("cart");
			if(goods) {
				$(".noGoods").hide();
				$(".goods_list").show();
				goods = JSON.parse(goods);
				for(var i = 0; i < goods.length; i++) {
					var good = goods[i];
					var li = $("<li></li>")
					var del = $("<p>删除</p>")
					var name = $("<a>" + goods[i].name + "</a>")
					var num = $("<em>" + goods[i].num + "</em>")
					var x = goods[i].num
					var y = $(".goodPrice").find("i").html();
					$(".cart_span").html(x);
					$(".title_left").find("i").html(x);
					$(".title_right").find("i").html(parseFloat(x * y))					
					var price = $("<span>" + goods[i].price + "</span>")
					copyImg.appendTo(li)
					li.append(name, price, num, del);
					ul.append(li);
					del.css({
						"display": "none"
					})
					$(".list li").mouseenter(function() {
						$(this).find("p").show();
					})
					$(".list li").mouseleave(function() {
						$(this).find("p").hide();
					})
				}				
			}
			$(".list li p").on("click", function() {
				$.cookie("cart", "", {
					expires: -1,
					path: "/"
				});
				$(this).parent().parent().hide();
				var x = $(this).parent().length
				if($(this).parent().length <= 1) {
					$(".noGoods").show();
					$(".goods_list").hide();
					$(".cart_span").html(0);
					$(".title_left").find("i").html(0);
					$(".title_right").find("i").html(parseFloat(0.00));
				}
			})
		}
	}
	addTo()
})