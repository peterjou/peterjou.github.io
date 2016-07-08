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
		$('.hr-top ul li').removeClass('kes')
		nc--;
		if(nc<0){
			nc=ken-1;
		}
		$('.hr-top ul li').eq(nc).addClass('kes')
	})
	$('.hr-top span:eq(1)').on('click',function(){
		fmove();
	})
	$('.hr-top').hover(function(){
		clearInterval(timer1)
	},function(){
		timer1=setInterval(function(){
			fmove();
		},3000)
	})
	timer1=setInterval(function(){
		fmove();
	},3000)
	function fmove(){
		$('.hr-top ul li').removeClass('kes')
		nc++;
		if(nc>ken-1){
			nc=0;
		}
		$('.hr-top ul li').eq(nc).addClass('kes')
	}
	
	
})
