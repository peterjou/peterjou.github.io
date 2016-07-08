// JavaScript Document
'use strict'
window.onload=function(){
	if (navigator.userAgent.indexOf("MSIE") > -1) {
        var ss = navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 4, navigator.userAgent.indexOf("MSIE") + 9);
        if (parseInt(ss) < 9) {
           window.location = "./news.html";
        }
    }
	var buy=document.getElementsByClassName('buy')[0];
	var buyh=document.getElementById('buy-hide');
	var oup=document.getElementsByClassName('up')[0];
	var den=document.getElementsByClassName('deng')[0];
	var denglu=document.getElementsByClassName('denglu')[0];
	var close=document.getElementsByClassName('close')[0];
	var amark=document.getElementsByClassName('mark')[0];
	var loginhide=document.getElementsByClassName('loginhide')[0];
	var loginp=loginhide.getElementsByTagName('p')[0];
	var loginspan=loginhide.getElementsByTagName('span')[0];
	var n=0;
	var timer1=null;
	var timer=null;
	var onoff=true;
	var login=document.getElementsByClassName('h-d')[0];
	var form=document.getElementsByTagName('form')[0];
	var oinp=form.getElementsByTagName('input');
	activ();
	login.onclick=autos;
	function autos(){
		
		setCookie('username', oinp[0].value, 4) 
		setCookie('password', oinp[1].value , 4) ;
		activ();
	}
	
	function activ(){
		if(getCookie('username')){
			den.style.display='none';
			loginhide.style.display='block';
			var usern=getCookie('username').indexOf('@');
			loginp.innerHTML=getCookie('username').substring(0,usern);
		}else{
			den.style.display='block';
			loginhide.style.display='none';
		}
		closed();
	}
	loginspan.onclick=function(){
		logins()
		removeCookie('username')
		removeCookie('password')
		oinp[0].value='';
	}
	den.onclick=logins;
	function logins(){
		denglu.style.display='block';
		amark.style.display='block';
		amark.style.width=window.innerWidth+'px';
		amark.style.height=window.innerHeight+'px';
	}
	close.onclick=closed;
	function closed(){
		denglu.style.display='none';
		amark.style.display='none';
	}
	window.onscroll=function(){
		if(window.pageYOffset>400){
			oup.style.display='block';
		}else{
			oup.style.display='none';
		}
	}
	oup.onclick=function(){
		var t=window.pageYOffset;
		timer=setInterval(function(){
			t-=30;
			if(t<0){
				t=0;
				clearInterval(timer)
			}
			window.scrollTo(0,t);
		},16)
	}
	//购物车
	buy.onmouseenter=function(){
		buyh.style.display='block';
	}
	buy.onmouseleave=function(){
		timer1=setTimeout(function(){
			buyh.style.display='none';
		},1000)
		buyh.onmouseenter=function(){
			buyh.style.display='block';
			clearTimeout(timer1)
		}
	}
	buyh.onmouseleave=function(){
		buyh.style.display='none';
	}
	//关于吸顶显示
	var xiding=document.getElementsByClassName('xiding')[0]
	window.onscroll=function(){
		fnmove();
	}
	fnmove();
	function fnmove(){
		if(window.pageYOffset>700){
			xiding.style.display='block';
		}else{
			xiding.style.display='none';
		}
	}
	//关于点击按钮添加数量，根据后面显示的剩余数量进行计算
	var btns=document.getElementsByClassName('adds');
	var ipt=document.getElementsByClassName('nmb')[0];
	var mors=document.getElementsByClassName('mors')[0];
	var les=parseInt(mors.innerText)
	var nc=parseInt(ipt.value)
	btns[0].onclick=function(){
		nc--;
		if(nc<=0){
			nc=0;
		}
		ipt.value=nc;
	}
	btns[1].onclick=function(){
		nc++;
		if(nc>les){
			nc=les;
		}
		ipt.value=nc; 
	}
	//点击图片，在另外一边显示
	$('.sec2 ul li').on('click',function(){
		$(this).css({'border':'3px solid #999'}).siblings().css({'border':'1px solid #f0f0f0'})
		$('.sec2 ol li').eq($(this).index()).css({'opacity':1}).siblings().css({'opacity':0});	
	})
}






