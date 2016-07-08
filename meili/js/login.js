$(function(){
	$('.molg').on('click',function(){
		$('.ocls').toggle();
	})
	var valc=$('form select').val()
	$('form select').on('change',function(){
		 valc=$('form select').val()
	})
	var onoff=true;
	$('form input').eq(0).blur(function(){
		var str1=$('form input').eq(0).val().trim();
		if(valc=='username'){
			//用用户名进行检验
			if(str1==''){
				onoff=false;
				$('form label:eq(0) strong').css({'display':'block'})
				$('form label:eq(0) span').html('用户名不能为空')
			}else {
				$('form label:eq(0) strong').css({'display':'block','background-positionX':-54})
				$('form label:eq(0) span').css({'color':'blue'}).html('ok')
			}
		}else{
			//用邮箱进行检验
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
		}
	})
	$('form input').eq(1).blur(function() {
		var str2 = $('form input').eq(1).val().trim();
		var rec = /[a-z0-9A-Z]{3,12}/
		if (str2 == '') {
			onoff=false;
			$('form label:eq(1) strong').css({'display': 'block'})
			$('form label:eq(1) span').html('密码不能为空')
		} else if (!rec.test(str2)) {
			onoff=false;
			$('form label:eq(1) strong').css({'display': 'block'})
			$('form label:eq(1) span').html('输入3-12位的密码')
		} else {
			$('form label:eq(1) strong').css({'display': 'block', 'background-positionX': -54})
			$('form label:eq(1) span').css({'color': 'blue'}).html('ok')
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
