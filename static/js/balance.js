$(function(){
	//搜索框
	$(".search_tabs").on("mouseenter",function(){
		$(this).find("i").css({"background-position":"-278px -291px"});
		$(".shop_serach").css({"overflow":"visible","height":"auto"})
	}).on("mouseleave",function(){
		$(this).find("i").css({"background-position":"-263px -291px"});
		$(".shop_serach").css({"overflow":"hidden","height":"35px"})
	})
	
	//商品结算
	var goods = $.cookie("cart");
	if(goods){
		goods = JSON.parse(goods);
		var isTrue = false;
		for(var i = 0;i < goods.length;i++){
			var li = $("<li></li>");
			var inp = $("<input type = 'checkbox' class='ui_checkbox' checked='checked'/>")
			var img = $("<img class='img'/>")
			img.attr("src","img/hot_10.jpg") 
			var name = $("<a>"+ goods[i].name +"</a>")
			var price = $("<span class='unit_price'><em>￥</em>"+ goods[i].price +"</span>")
			var num = $("<div class='check_goods_num'>"+ goods[i].num +"</div>");
			var cell = $("<div class='cell'><span class='total_price'><em>￥</em>"+ parseFloat(((goods[i].num)*(goods[i].price))) +"</span></div>")
			var del = $("<i class='active'>删除</i>")
			del.css({"float":"left","padding-left":"25px","padding-top":"30px","cursor":"pointer"})
			li.append(inp,img,name,price,num,cell,del);
			$(".item_list_ul").append(li);
			$(".cart_check_sum").html(goods[i].num);
			$(".cart_goods_amount").html(goods[i].price);
		}
		del.click(function(){
			$.cookie("cart","",{expires:-1,path:"/"})
			console.log(goods.length)
			if(goods.length <= 1){
				$(".shop").hide()
				$(".item_list").hide();
				$(".nogoods").show();
				$(".cart_check_sum").html("0");
				$(".cart_goods_amount").html("0.00");
				$(":checkbox").prop("checked",false)
			}
		})
		
	}else{
		$(".shop").hide()
		$(".item_list").hide();
		$(".nogoods").show();
		$(".cart_check_sum").html("0");
		$(".cart_goods_amount").html("0.00");
	}
	
	//全选
	var $checkbox = $(":checkbox").not(".check_all")
	$(".check_all").click(function(){
		$checkbox.prop('checked',$(".check_all").prop('checked'));
	})
})