$(function(){
	$('.molg').on('click',function(){
		$('.ocls').toggle();
	})
	var onoff=true;

	//邮箱
	$('form label:eq(0) input').blur(function(){
		console.log(321)
		var str1=$('form label:eq(0) input').val().trim();
		var rel=/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/
		if(str1==''){
			onoff=false;
			$('form label:eq(0) strong').css({'display':'block'})
			$('form label:eq(0) span').html('邮箱不能为空')
		}else if(!rel.test(str1)){
			onoff=false;
			$('form label:eq(0) strong').css({'display':'block'})
			$('form label:eq(0) span').html('邮箱不符合规则')
		}else {
			$('form label:eq(0) strong').css({'display':'block','background-positionX':-54})
			$('form label:eq(0) span').css({'color':'blue'}).html('ok')
		}
	})
	//用户名
	$('form label:eq(1) input').blur(function(){
		var str2=$('form label:eq(1) input').val().trim();
		if(str2==''){
			onoff=false;
			$('form label:eq(1) strong').css({'display':'block'})
			$('form label:eq(1) span').html('昵称不能为空')
		}else{
			$('form label:eq(1) strong').css({'display':'block','background-positionX':-54})
			$('form label:eq(1) span').css({'color':'blue'}).html('ok')
		}
	})
	//获得焦点，显示最后一个
	$('form label:eq(2) input').focus(function(){
			$('form label').eq(3).css({'display':'block'})
		})
	var str3=null;
	//密码
	$('form label:eq(2) input').blur(function(){
		str3 = $('form input').eq(2).val().trim();
		var rec = /[a-z0-9A-Z]{3,12}/
		if (str3 == '') {
			onoff=false;
			$('form label:eq(2) strong').css({'display': 'block'})
			$('form label:eq(2) span').html('密码不能为空')
		} else if (!rec.test(str3)) {
			onoff=false;
			$('form label:eq(2) strong').css({'display': 'block'})
			$('form label:eq(2) span').html('输入3-12位的密码')
		} else {
			$('form label:eq(2) strong').css({'display': 'block', 'background-positionX': -54})
			$('form label:eq(2) span').css({'color': 'blue'}).html('ok')
		}
	})
	//再次输入密码
	$('form label:eq(3) input').blur(function(){
		var str4 = $('form input').eq(3).val().trim();
		var rec = /[a-z0-9A-Z]{3,12}/
		if (str4 == '') {
			onoff=false;
			$('form label:eq(3) strong').css({'display': 'block'})
			$('form label:eq(3) span').html('密码不能为空')
		} else if (!rec.test(str4)) {
			onoff=false;
			$('form label:eq(3) strong').css({'display': 'block'})
			$('form label:eq(3) span').html('输入3-12位的密码')
		}else if(str4!=str3){
			onoff=false;
			$('form label:eq(3) strong').css({'display': 'block'})
			$('form label:eq(3) span').html('两次密码输入不同')
		}else {
			$('form label:eq(3) strong').css({'display': 'block', 'background-positionX': -54})
			$('form label:eq(3) span').css({'color': 'blue'}).html('ok')
		}
	})
	$('.button').on('submit',function(){
		if(onoff){
			console.log('true')
		}else{
			return onoff;
		}
	})
})