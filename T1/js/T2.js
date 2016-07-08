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
	var n=0;
	var timer1=null;
	var timer=null;
	var onoff=true;
	var login=document.getElementsByClassName('h-d')[0];
	var form=document.getElementsByTagName('form')[0];
	var oinp=form.getElementsByTagName('input');
	
	login.onclick=function(){
		setCookie('username', oinp[0].value, 4) 
		setCookie('password', oinp[1].value , 4) 
	}
	den.onclick=function(){
		denglu.style.display='block';
		amark.style.display='block';
		amark.style.width=window.innerWidth+'px';
		amark.style.height=window.innerHeight+'px';
	}
	close.onclick=function(){
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
	var nav2=document.getElementsByClassName('nav2')[0];
	var chose=document.getElementsByClassName('chose')[0];
	var sec2=document.getElementsByClassName('sec2-b')[0];
	var secchid=sec2.getElementsByTagName('div');
	var dc=1;
	window.onscroll=function(){
		if(window.pageYOffset>100){
			nav2.style.position='fixed';
			nav2.style.top='0px';
			nav2.style.zIndex=99;
			oup.style.display='block';
			addClass(nav2,'otr')
		}else{
			nav2.style.position='';
			oup.style.display='none';
			removeClass(nav2,'otr')
		}
		if(window.pageYOffset>800){
			if(dc==1){
				dc=2;
				fa(secchid[0],140,100);
				setTimeout(function(){
					fa(secchid[1],320,280)
				},200)
				setTimeout(function(){
					fa(secchid[2],180,140)
				},400)
				setTimeout(function(){
					fa(secchid[3],80,40)
				},300)
			}
			
		}
		function fa(nol,obj,otr){
			nol.timer=setInterval(function(){
				obj--;
				if(obj<otr-40){
					obj=otr-40
					clearInterval(nol.timer)
				}
				nol.style.top=obj+'px';
			},16)
		}
	}
	var tex=document.getElementById('movetex');
	var mov=document.getElementById('nedmove');
	var timer=null;
	var n=100;
	var t=0;
	timer=setInterval(function(){
		n--;
		if(n<30){
			n=30;
			clearInterval(timer)
			timer1=setInterval(function(){
				t+=0.01;
				if(t>1){
					clearInterval(timer1);
				}
				tex.style.opacity=t;
			},16)
		}
		mov.style.backgroundPositionY=n+'px';
	},16)
	var sec3b=document.getElementsByClassName('sec3-b')[0];
	var simg=sec3b.getElementsByTagName('img');
	simg[0].onmouseenter=function(){
		simg[0].style.display='none';
		simg[1].style.display='block';
	}
	simg[1].onmouseleave=function(){
		simg[0].style.display='block';
		simg[1].style.display='none';
	}
}