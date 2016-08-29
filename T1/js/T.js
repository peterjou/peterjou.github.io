'use strict'
window.onload=function(){
	if (navigator.userAgent.indexOf("MSIE") > -1) {
        var ss = navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 4, navigator.userAgent.indexOf("MSIE") + 9);
        if (parseInt(ss) < 9) {
           window.location = "./news.html";
        }
    }
	var adong=document.getElementsByClassName('use-3d')[0];
	var aul=adong.getElementsByTagName('ul')[0];
	var ali=aul.getElementsByTagName('li');
	var ool=adong.getElementsByTagName('ol')[0];
	var oli=ool.getElementsByTagName('li');
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
	//下面显示的3d效果的轮播图，点击事件
	for(var i=0;i<oli.length;i++){
		oli[i].index=i;
		oli[i].onclick=function(){
			ali[n].style.opacity=0;
			oli[n].className='';
			nTween(ali[n],{'opacity':0}, 200, 'linear')
			n=this.index;
			oli[n].className='mos1';
			nTween(ali[n],{'opacity':1}, 200, 'linear')
		}
	}
	//轮播图清楚定时器
	aul.onmouseover=function(){
		//clearInterval(timer)
	}
	ool.onmouseover=function(){
		//clearInterval(timer)
	}
	//鼠标离开时自动开启轮播图
	aul.onmouseout=function(){
		//timer=setInterval(fmove,2000)
		aul.style.transform="rotateX(0)";
		aul.style.transform="rotateY(0)";
		for(var i=0;i<ali.length;i++){
			ali[i].className='';
		}
	}
	//鼠标划入时，自动有3D效果
	aul.onmousemove=function(ev){
		var pos=aul.getBoundingClientRect();
		var dix=ev.clientX-pos.left;
		var diy=ev.clientY-pos.top;
		ali[n].className='col';
		if(dix<400){
			aul.style.transform="rotateY(-2deg)"
		}
		
		if(diy<140&&diy>50){
			aul.style.transform="rotateX(4deg)"
		}
		if(dix>700){
			aul.style.transform="rotateY(2deg)"
		}
		if(diy>300&&diy<444){
			aul.style.transform="rotateX(-4deg)"
		}
	}
	//初始化开启定时器
	//timer=setInterval(fmove,2000);
	//定时器的封装函数
	function fmove(){
		oli[n].className='';
		nTween(ali[n],{'opacity':0}, 200, 'linear')
		n++;
		if(n>ali.length-1){
			n=0;
		}
		oli[n].className='mos1';
		nTween(ali[n],{'opacity':1}, 200, 'linear')
	}
	//关于手机端banner的左右拖拽
	fnTab()
	function fnTab()
	{
		var oTab=document.getElementsByClassName('use-3d')[0];
		var oList=document.getElementsByClassName('ju-ul')[0];
		var ochid=document.getElementsByClassName('ju-ul')[0].children;
		
		var aNav=document.getElementsByClassName("ju-dians")[0].children;
		
		var iNow=0;
		var iX=0;
		var iW=view().w;
		var oTimer=0;
		var iStartTouchX=0;
		var iStartX=0;
		bind(oTab,"touchstart",fnStart);
		bind(oTab,"touchmove",fnMove);
		bind(oTab,"touchend",fnEnd);
		auto();
		
		function auto()
		{
			timer=setInterval(function(){
				iNow++;	
				if(iNow>=aNav.length){
					iNow=0;	
				}
				tab();
			},2000);
		}
		function fnStart(ev)
		{
			clearInterval(timer);
		}
		function fnMove(ev)
		{
			
		}
		function fnEnd()
		{
			iNow++;
			if(iNow>=aNav.length){
				iNow=0;
			}
			tab();
			auto();
		}
		function tab()
		{
			iX=-iNow*iW;
			for(var i=0;i<aNav.length;i++)
			{
				removeClass(aNav[i],"mos1");
				ochid[i].style.opacity=0;
			}
			ochid[iNow].style.opacity=1;
			addClass(aNav[iNow],"mos1");
		}
		function bind(obj, ev, fn) { 
			if (obj.addEventListener) {
				obj.addEventListener(ev, fn, false);
			} else {
				obj.attachEvent('on' + ev, function() {
					fn.call(obj);
				});
			}
		}
	}
}

