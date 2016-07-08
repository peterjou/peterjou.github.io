// JavaScript Document
'use strict'
$(function(){
	//吸顶导航
	window.onscroll=function(){
		nav();
	}
	nav();
	function nav(){
		if(window.pageYOffset>150){
			$('header').css({
				'position':'fixed',
				'top':0,
				'background':'#fff',
				'z-index':99
			})
			$('.toup').parent().css({'display':'block'})
		}else{
			$('header').css({
				'position':''
			})
			$('.toup').parent().css({'display':'none'})
		}
	}
	//关于右边定位的高度
	ms();
	
	window.onresize=function(){
		ms();
	}
	function ms(){
		var morheight=window.innerHeight;
		$('.navright').css({
			'height':morheight
		})
		$('.huadong').css({
			'height':morheight
		})
	}
	//关于右边导航页
	document.onmouseover=function(ev){
		var ev=ev||event;
		if(ev.clientX>window.innerWidth-58){
			$('.huadong').stop().animate({left:0},200,'linear')
		}else{
			$('.huadong').stop().animate({left:38},200,'linear')
		}
	}
	//鼠标划入top时候的函数
	$('.toup').parent().hover(function(){
		$('.toup').css({'display':'none'})
		$('.toups').css({'display':'block'})
	},function(){
		$('.toups').css({'display':'none'})
		$('.toup').css({'display':'block'})
	})
	//点击回顶部
	$('.toups').parent().on('click',function(){
		var ocn=window.pageYOffset;
		timers=setInterval(function(){
			ocn-=20;
			if(ocn<=0){
				ocn=0;
				clearInterval(timers)
				$('.toups').parent().css({'display':'none'})
			}
			window.scrollTo(0,ocn)
		},16)
	})
	//下载客户端的列表
	$('.xiazai').on('mouseenter',function(){
		$('.kehuduan').css({'display':'block'})
		$('.xiazai em').css({'background-positionX':-30});
		console.log(1)
	});
	$('.xiazai').on('mouseleave',function(){
		$('.kehuduan').css({'display':'none'});
		$('.xiazai em').css({'background-positionX':-20});
	});
	//更多的下拉菜单
	var more=document.getElementById('more')
	$('.head ul>li').eq(8).hover(function(){
		$('.head ul>li em').css({'background-positionX':-30});
		$(more).css({'display':'block'});
	},function(){
		$('.head ul>li em').css({'background-positionX':-20});
		$(more).css({'display':'none'});
	})
	//商品和店铺的切换
	var nbt1=document.getElementById('nb1');
	var nbts=nbt1.getElementsByTagName('h4');
	for(var i=0;i<nbts.length;i++){
		nbts[i].index=i;
		nbts[i].onclick=function(){
			for(var j=0;j<nbts.length;j++){
				removeClass(nbts[j], 'act') 
				$('nav .sou .sousuo div').eq(1).css({'display':'none'});
				$('nav .sou .sousuo div').eq(2).css({'display':'none'});
			}
			addClass(this, 'act')
			if(this.index==0){
				$('nav .sou .sousuo div').eq(1).css({'display':'block'});
			}else{
				$('nav .sou .sousuo div').eq(2).css({'display':'block'});
			}
		}
	}
	var ken=$('.hr-top ul li').length;
	var timer1=null;
	var nc=0;
	//点击按钮，切换图片
	$('.hr-top span:eq(0)').on('click',function(){
		$('.hr-top ul li').removeClass('kes').fadeOut(400)
		nc--;
		if(nc<0){
			nc=ken-1;
		}
		$('.hr-top ul li').eq(nc).addClass('kes').fadeIn(300)
	})
	$('.hr-top span:eq(1)').on('click',function(){
		fmove();
	})
	$('.hr-top').hover(function(){
		clearInterval(timer1)
	},function(){
		timer1=setInterval(function(){
			fmove();
		},1500)
	})
	timer1=setInterval(function(){
		fmove();
	},1500)
	function fmove(){
		$('.hr-top ul li').removeClass('kes').fadeOut(400)
		nc++;
		if(nc>ken-1){
			nc=0;
		}
		$('.hr-top ul li').eq(nc).addClass('kes').fadeIn(300)
	}
	//关于鼠标点击更多的效果
	$('.oc_btn').attr('bb',false)
	$('.oc_btn').on('click',function(){
		if($(this).attr('bb')=='false'){
			$(this).parent().css({height:80})	
			$(this).html('收起<i></i>')
			$(this).attr('bb',true)
			$(this).find('i').css({'background-positionY':-22})
		}else{
			$(this).parent().find('p i').css({'display':'none'});
			$(this).parent().css({height:40})	
			$(this).html('更多<i></i>')
			$(this).attr('bb',false)
			$(this).find('i').css({'background-positionY':-16})	
			$(this).parent().find('.more_sel').attr('cc',false)
		}
	})
	//点击筛选更多效果
	$('.box_expend').attr('aa',false)
	$('.box_expend').on('click',function(){
		if($('.box_expend').attr('aa')=='false'){
			$('.cons').css({'display':'block'})
			$(this).html('收起筛选<i class="arrow_down" id="i_s"></i>')
			$(this).attr('aa',true)
			$(this).find('i').css({'background-positionY':-22})
			
		}else{
			$('.cons').css({'display':'none'})
			$(this).html('更多筛选<i class="arrow_down" id="i_s"></i>')
			$(this).attr('aa',false)
			$(this).find('i').css({'background-positionY':-16})
		}
			
	})
	//点击多选
	$('.more_sel').attr('cc',false)
	$('.more_sel').on('click',function(){
		if($(this).attr('cc')=='false'){
			$(this).parent().find('p i').css({'display':'inline-block'});
			$(this).attr('cc',true)
			$(this).parent().find('.oc_btn').attr('bb',true)
			$(this).parent().find('.oc_btn').html('收起<i></i>')
			$(this).parent().css({height:'auto'})
			$(this).parent().find('cite i').css({'background-positionY':-22})
		}else{
			$(this).parent().find('p i').css({'display':'none'});
			$(this).attr('cc',false)
			$(this).parent().find('.oc_btn').attr('bb',false)
			$(this).parent().find('.oc_btn').html('更多<i></i>')
			$(this).parent().css({height:40})
			$(this).parent().find('cite i').css({'background-positionY':-16})	
		}
	})
	//点击取消
	$('.operate_btns span:eq(1)').on('click',function(){	
		$(this).parent().parent().find('p i').css({'display':'none'});
		$(this).parent().parent().find('.more_sel').attr('cc',false)
		$(this).parent().parent().find('.oc_btn').attr('bb',false)
		$(this).parent().parent().find('.oc_btn').html('更多<i></i>')
		$(this).parent().parent().css({height:40})
		$(this).parent().parent().find('cite i').css({'background-positionY':-16})
	})
	//点击提交
	$('.operate_btns span:eq(0)').on('click',function(){
		$(this).parent().parent().find('p i').css({'display':'none'});
		$(this).parent().parent().find('.more_sel').attr('cc',false)
		$(this).parent().parent().find('.oc_btn').attr('bb',false)
		$(this).parent().parent().find('.oc_btn').html('更多<i></i>')
		$(this).parent().parent().css({height:40})
		$(this).parent().parent().find('cite i').css({'background-positionY':-16})	
	})
})