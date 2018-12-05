$(function(){
	$("#login_button").click(function(){
		var users = $.cookie("users");
		if(users){
			users = JSON.parse(users);
			
			var isTrue = false;
			for(var i = 0;i < users.length;i++){
				if(users[i].name == $("#loginname").val() && users[i].pwd == $("#psw").val() && $("#loginname").val() != "" && $("#psw").val() != ""){
					console.log("登录成功");	
					alert("登录成功")
					$(".msg_wrap").hide();
					var _name = users[i].name
					console.log((_name))
				setTimeout(function(){
					window.location.href = "http://127.0.0.1:8020/shanmao/index.html?username="+_name;
				},3000)
					
					isTrue = true;
				}
				else if(users[i].name != $("#loginname").val()){
					$(".msg_wrap").show();
					$(".msg_error").html("用户名不存在，请先注册！")
				}		
			}
			if(!isTrue){
				$(".msg_wrap").show();
			}
		}
		else{
				$(".msg_wrap").show();
				$(".msg_error").html("用户名不存在，请先注册！")
		}
	})
	
	//登录成功页面跳转
	
	//焦点在用户名
	$("#loginname").focus(function(){
		$(this).css({"border-color":"green"})
		$(this).parent().find("i").css({"background-position":"-3px -25px"})
	})
	$("#loginname").blur(function(){
		$(this).css({"border-color":"#c9c9c9"});
		$(this).parent().find("i").css({"background-position":"-25px -25px"})
	})
	
	//焦点在密码
	$("#psw").focus(function(){
		$(this).css({"border-color":"green"})
		$(this).parent().find("i").css({"background-position":"-3px -48px"})
	})
	$("#psw").blur(function(){
		$(this).css({"border-color":"c9c9c9"})
		$(this).parent().find("i").css({"background-position":"-25px -48px"})
	})
	
	//第三方登录
	$(".qq").on("mouseenter",function(){
		$(this).css({"background-position":"-306px -333px"})
	}).on("mouseleave",function(){
		$(this).css({"background-position":"-306px -307px"})
	})
	$(".sina").on("mouseenter",function(){
		$(this).css({"background-position":"-367px -333px"})
	}).on("mouseleave",function(){
		$(this).css({"background-position":"-369px -307px"})
	})
	
	//保存登录信息
})
