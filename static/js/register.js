$(function() {

	//用户名
	$("#username").focus(function() {
		$(this).css({
			"border-color": "green"
		})
		$(this).parent().find("i").css({
			"background-position": "-3px -25px"
		})
	})
	$("#username").blur(function() {
			$(this).css({
				"border-color": "#c9c9c9"
			});
			$(this).parent().find("i").css({
				"background-position": "-25px -25px"
			})
			var notice = $("#username_notice label");
			//正则
			var reg = /^[a-zA-z_][a-zA-Z0-9_]{5,14}$/;
			if($("#username").val().length < 3) {
				$("#username_notice").find("i").hide();
				notice.html("用户名长度不能少于 3 个字符")
			} else if(!reg.test($("#username").val())) {
				$("#username_notice").find("i").hide();
				notice.html("不能使用数字开头，长度在6-15位")
			} else {
				$("#username_notice").find("i").show();
				notice.html("");
			}
		})
		//邮箱地址
	$("#email").focus(function() {
		$(this).css({
			"border-color": "green"
		})
		$(this).parent().find("i").css({
			"background-position": "-54px -3px"
		})
		var notice = $("#email_notice label");
		notice.css({
			"background": "#efefef",
			"color": "#666"
		})
		notice.html("请正确填写有效邮箱地址");
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(reg.test($("#email").val())) {
			notice.css({
				"background": "#fff",
				"color": "#666"
			})
			$("#email_notice").find("i").show();
			notice.html("");
		}
	})
	$("#email").blur(function() {
			$(this).css({
				"border-color": "#c9c9c9"
			});
			$(this).parent().find("i").css({
				"background-position": "-77px -3px"
			})
			var notice = $("#email_notice label");
			var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			notice.css({
				"background": "#fff",
				"color": "#ec5051"
			})
			if($("#email").val() == "") {
				$("#email_notice").find("i").hide();
				notice.html('邮箱地址不能为空');
			} else if(!reg.test($("#email").val())) {
				$("#email_notice").find("i").hide();
				notice.html('格式错误，请输入正确的邮箱地址');
			} else {
				$("#email_notice").find("i").show();
				notice.html("");
			}
		})
		//设置密码
	$("#password").focus(function() {
		$(this).css({
			"border-color": "green"
		})
		$(this).parent().find("i").css({
			"background-position": "-3px -48px"
		})
	})
	$("#password").blur(function() {
			$(this).css({
				"border-color": "#c9c9c9"
			});
			$(this).parent().find("i").css({
				"background-position": "-25px -48px"
			})
			var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
			var notice = $("#password_notice label");
			if($("#password").val() == "") {
				$("#password_notice").find("i").hide();
				notice.html("请输入密码");
			} else if(!reg.test($("#password").val())) {
				$("#password_notice").find("i").hide();
				notice.html("登录密码不能少于 6 个字符。")
			} else {
				$("#password_notice").find("i").show();
				notice.html("");
			}
		})
		//确认密码
	$("#confirm").on("focus", function() {
		$(this).css({
			"border-color": "green"
		})
		$(this).parent().find("i").css({
			"background-position": "-3px -48px"
		})
	}).on("blur", function() {
		$(this).css({
			"border-color": "#c9c9c9"
		});
		$(this).parent().find("i").css({
			"background-position": "-25px -48px"
		})
		var notice = $("#confirm_notice label");
		if($("#password").val() == "") {
			$("#confirm_notice").find("i").hide();
			notice.html("确认密码不能为空");
		} else if($("#password").val() != $("#confirm").val()) {
			$("#confirm_notice").find("i").hide();
			notice.html("两次输入密码不一致");
		} else {
			$("#confirm_notice").find("i").show();
			notice.html("");
		}
	})

	$("#regist_submit").click(function() {
		if($("#username").val() != "" && $("#password").val() != "" && $("#email").val() != "" && $("#confirm").val() != "") {
			var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
			//判断是否存在该用户
			for(var i = 0; i < users.length; i++) {
				if(users[i].name == $("#username").val() && $("#username").val() != "") {
					$("#username_notice label").html("用户名已存在! 不能注册相同的用户");
					$("#username_notice").find("i").hide();
					return;
				}
			}
		}

		//注册用户
		if($("#password").val() == $("#confirm").val()) {
			var user = {
				name: $("#username").val(),
				pwd: $("#password").val()
			}
			users.push(user);

			$.cookie("users", JSON.stringify(users), {
				expires: 7,
				path: "/"
			});
			console.log($.cookie("users"));
			alert("注册成功")
			jumpTo();
		}
	})

	function jumpTo() {
		window.location.href = "http://127.0.0.1:8020/shanmao/login.html";
	}
})