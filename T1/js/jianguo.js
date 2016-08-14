'use strict'
window.onload=function(){
	var ac=navigator.userAgent;
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
	var cli=chose.getElementsByTagName('li')
	var dc=1;
	var oc=1;
	var sec1s=document.getElementsByClassName('sec1')[0];
	var sec3s=document.getElementsByClassName('sec3')[0];
	var sec2s=document.getElementsByClassName('sec2')[0];
	var aimg=sec2s.getElementsByTagName('img');
	var sec4s=document.getElementsByClassName('sec4')[0];
	var oimg=sec4s.getElementsByTagName('img');
	var cn1=140;
	var cn2=240;
	var cl=160;
	var ct=0;
	var ocn=0;
	var timer1=null;
	var timer2=null;
	for(var i=0;i<cli.length;i++){
		cli[i].index=i;
		cli[i].onclick=function(){
			var t=window.pageYOffset;
			removeClass(cli[ocn],'choli');
			ocn=this.index;
			addClass(cli[this.index],'choli');
			switch(ocn){
				case 0:
					fk(sec1s,0,t)
					break;
				case 1:
					fk(sec2s,1,t)
					break;
				case 2:
					fk(sec3s,2,t)
					break;
				case 3:
				console.log(1)
					fk(sec4s,3,t)
					break;
			}
		}
	}
	function fk(obj,m,t){
		if(t>obj.offsetTop){
			timer=setInterval(function(){
				t-=40;
				if(t<obj.offsetTop){
					t=obj.offsetTop;
					clearInterval(timer);
				}
				window.scrollTo(0,t)
			},16)
		}else{
			timer=setInterval(function(){
				t+=40;
				if(t>obj.offsetTop){
					t=obj.offsetTop;
					clearInterval(timer)
				}
				window.scrollTo(0,t)
			},16)	
		}
	}
	window.onscroll=function(){
		if(window.pageYOffset>200){
			nav2.style.position='fixed';
			nav2.style.top='0px';
			nav2.style.zIndex=99;
			oup.style.display='block';
			addClass(nav2,'otr');
			chose.style.display='block';
		}else{
			nav2.style.position='';
			oup.style.display='none';
			removeClass(nav2,'otr');
			chose.style.display='none';
			for(var i=0;i<cli.length;i++){
				removeClass(cli[i],'choli')
			}
			addClass(cli[0],'choli');
		}
		if(window.pageYOffset>600&window.pageYOffset<1200){
			for(var i=0;i<cli.length;i++){
				removeClass(cli[i],'choli')
			}
			addClass(cli[1],'choli');
			if(dc==1){
				dc=2;
				timer1=setInterval(function(){
					cn1--;
					cn2--;
					if(cn2<200){
						cn2=200;
					}
					if(cn1<0){
						cn1=0;
						clearInterval(timer1);
					}
					aimg[1].style.top=cn1+'px';
					aimg[2].style.top=cn2+'px';
				},16)
			}
		}else if(window.pageYOffset<1800&window.pageYOffset>1200){
			for(var i=0;i<cli.length;i++){
				removeClass(cli[i],'choli')
			}
			addClass(cli[2],'choli');
		}else if(window.pageYOffset>1800){
			for(var i=0;i<cli.length;i++){
				removeClass(cli[i],'choli')
			}
			addClass(cli[3],'choli');
			if(oc==1){
				oc=2;
				timer2=setInterval(function(){
					cl-=3;
					ct--;
					if(ct<-30){
						ct=-30;
					}
					if(cl<60){
						cl=60;
					}
					oimg[0].style.left=cl+'px';
					oimg[0].style.top=ct+'px';
					oimg[1].style.right=cl+'px';
					oimg[1].style.top=ct+'px';
				},16)
			}
		}
	}
	var moves=document.getElementsByClassName('sec1-b')[0];
	var aul=moves.getElementsByTagName('ol')[0];
	var ali=moves.getElementsByTagName('li');
	var aimgs=aul.getElementsByTagName('img');
	console.log(aimgs.length)
	var conoff=false;
	//鼠标点击后的效果
	
	aul.onclick=function(){
		if(!conoff){
			if(ac.indexOf('Firefox')!=-1){
				aul.style.MozTransform='scale(2)';
			}else if(ac.indexOf('Chrome')!=-1){
				aul.style.webkitTransform='scale(2)';
			}else if(ac.indexOf('Media')!=-1){
				aul.style.transform='scale(2)';
			}
			conoff=true;
		}else{
			if(ac.indexOf('Firefox')!=-1){
				aul.style.MozTransform='scale(1)';
			}else if(ac.indexOf('Chrome')!=-1){
				aul.style.webkitTransform='scale(1)';
			}else if(ac.indexOf('Media')!=-1){
				aul.style.transform='scale(1)';
			}
			conoff=false;
		}	
	}
	//鼠标划入的效果
	aul.onmousemove = function(ev){
		var ev = ev || window.event;
		for(var i=0;i<ali.length;i++){
			var x = ali[i].offsetLeft + ali[i].offsetWidth/2;
			var y = ali[i].offsetTop + ali[i].offsetHeight/2 +aul.offsetTop;
			var a = ev.clientX - x;
			var b = ev.clientY - y;
			var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
			var scale  =  c/500;
			if(scale < 0.2){
				scale = 0.2;
			}
			ali[i].style.top = scale * 128-50 + 'px';
		}	
	}
	//鼠标划出的效果
	aul.onmouseleave=function(){
		for(var i=0;i<ali.length;i++){
			ali[i].style.top='';
		}
	}
	
}