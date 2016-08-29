window.onload=function(){
	//版本控制
	var ac=navigator.userAgent;
	if (navigator.userAgent.indexOf("MSIE") > -1) {
        var ss = navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 4, navigator.userAgent.indexOf("MSIE") + 9);
        if (parseInt(ss) < 10) {
           window.location = "./news.html";
        }
    }
	//console一个，请关注哦！
	console.log("如果感兴趣请联系我哦！\n 鞠加斌，peterjou \n 微信：15967650819 \n QQ:594161154@qq.com \n 电话：15967650819");
	//top按钮
	var toup=document.getElementById('toup');
	autos();
	function autos(){
		if(window.pageYOffset>100){
			toup.style.display='block';
		}else{
			toup.style.display='none';
		}	
	}
	window.onscroll=function(){
		autos();
	}
	toup.onclick=function(){
		var ups=window.pageYOffset;
		timer=setInterval(function(){
			ups-=20;
			if(ups<0){
				ups=0;
				clearInterval(timer)
			}
			window.scrollTo(0,ups);	
		},16)	
	}
	
	//碰撞球
	var peng=document.getElementsByClassName('peng')[0]
	var pli=peng.getElementsByTagName('li');
	for(var i=0;i<pli.length;i++){
		pli[i].style.left=i*10+'px';	
	}
	pengd();
	function pengd(){
		nTween(pli[0], {left:-20}, 300, 'linear', function(){
			nTween(pli[0], {left:0}, 300, 'linear',function(){
				nTween(pli[4], {left:60}, 300, 'linear'	,function(){
					nTween(pli[4], {left:40}, 300, 'linear',function(){
						pengd();	
					})	
				})
			})
		})
	}
	//旋转图片中文字的控制
	var want=document.getElementsByClassName('want')[0];
	setTimeout(function(){
		nTween(want, {top:184,opacity:1}, 1000, "bounceBoth")
	},300)
	
	$('.geren').stop().animate({
					top:70,
					opacity:1
		},700,'linear')
		setTimeout(function(){
			$('.res').stop().animate({
				top:168,
				opacity:1
			},700,'linear')
		},150)
	//3D效果
	var oPicList=document.getElementById("picList");
	var oCss=document.getElementById("css");
	var aBtns=document.getElementById("btns").getElementsByTagName("li");
	var aLi=null;
	var sLi="";
	var sCss="";
	var iLiw=25;
	var iZindex=0;
	var iNow=0;
	var vn=100
	var iLength=oPicList.clientWidth/iLiw;
	for(var i=0;i<iLength;i++)
	{
		i>iLength/2?iZindex--:iZindex++;
		sLi+='<li><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a><span></span><span></span></li>';
		sCss+="#picList li:nth-of-type("+(i+1)+") a{ background-position:-"+i*iLiw+"px 0;}";
		sCss+="#picList li:nth-of-type("+(i+1)+") {z-index:"+iZindex+"}";
		
	}
	oPicList.innerHTML=sLi;
	oCss.innerHTML+=sCss;
	aLi=oPicList.children;
	if(ac.indexOf('Media')!=-1){
		console.log(oPicList)
		aBtns[1].style.display="none";	
	}
	for(var i=0;i<aBtns.length;i++)
	{
		(function(a){
			aBtns[a].onclick=function()
			{
				vn++;
				for(var i=0;i<aLi.length;i++)
				{
					var aa=aLi[i].getElementsByTagName('a');
					aa[a].style.zIndex=vn;
					for(var j=0;j<aa.length;j++){
						aa[j].style.opacity=0;
					}
					aa[a].style.opacity=1
					aLi[i].style.transition="0.5s "+i*50+"ms";
					if(ac.indexOf('Firefox')!=-1){
						aLi[i].style.MozTransform="rotateX(-"+a*90+"deg)";
					}else if(ac.indexOf('Chrome')!=-1){
						aLi[i].style.WebkitTransform="rotateX(-"+a*90+"deg)";
					}else if(ac.indexOf('Media')!=-1){
						aLi[i].style.transform="rotateX(-"+a*90+"deg)";
					}else{
						aLi[i].style.transform="rotateX(-"+a*90+"deg)";
					}
					
				}	
				this.className="active";
				aBtns[iNow].className="";
				iNow=a;
			};	
		})(i)
	}
	//为点击旋转图片
	var oHome=document.getElementById('home');
	var spo=oHome.getElementsByTagName('span')[0]
	var amea=document.getElementById('menu_list')
	var aImg=amea.getElementsByTagName('img');
	var ap=amea.getElementsByTagName('p');
	var foots=document.getElementsByClassName('footer')[0]
	var onOff=true;
	var iR=-260;
	var n=-70;
	var q=-100;
	oHome.onclick=function(){
		if(onOff){
			foots.style.transition=0.4+"s";
			foots.style.height=350+'px';
			spo.style.opacity=0;
			setTimeout(function(){
				spo.style.opacity=1
				spo.innerHTML="请点击关闭图片"	
			},2000)
			for(var i=0;i<aImg.length;i++)
			{		
					var oLt=toLT(iR,90/3*i);
					ap[i].style.transition="0.8s "+i*300+"ms"
					aImg[i].style.transition="0.5s "+i*300+"ms";
					aImg[i].style.left=oLt.l+n*i+'px';
					aImg[i].style.top=-oLt.t+n+'px';
					if(ac.indexOf('Firefox')!=-1){
						aImg[i].style.MozTransform='rotate(-720deg)';
					}else if(ac.indexOf('Chrome')!=-1){
						aImg[i].style.WebkitTransform='rotate(-720deg)';
					}else if(ac.indexOf('Media')!=-1){
						aImg[i].style.transform='rotate(-720deg)';
					}
					ap[i].style.opacity=1;
					ap[i].style.left=oLt.l+(n-16)*i+'px';
					ap[i].style.top=-oLt.t+q+'px';
					
					addEnd(aImg[0],end)
					function end()
					{
						if(ac.indexOf('Firefox')!=-1){
							aImg[0].style.MozTransform='rotate(-360deg)';
						}else if(ac.indexOf('Chrome')!=-1){
							aImg[0].style.WebkitTransform='rotate(-360deg)';
						}else if(ac.indexOf('Media')!=-1){
							aImg[0].style.transform='rotate(-360deg)';
						}	
						removeEnd(aImg[0],end)
					}
					function addEnd(obj,fn)
					{
						if(ac.indexOf('Firefox')!=-1){
							obj.addEventListener('MozTransitionEnd',fn,false);
						}else if(ac.indexOf('Chrome')!=-1){
							obj.addEventListener('WebkitTransitionEnd',fn,false);
						}else if(ac.indexOf('Media')!=-1){
							obj.addEventListener('transitionEnd',fn,false);
						}
						
						obj.addEventListener('transitionend',fn,false);
					}
					function removeEnd(obj,fn)
					{
						if(ac.indexOf('Firefox')!=-1){
							obj.removeEventListener('MozTransitionEnd',fn,false);
						}else if(ac.indexOf('Chrome')!=-1){
							obj.removeEventListener('WebkitTransitionEnd',fn,false);
						}else if(ac.indexOf('Media')!=-1){
							obj.removeEventListener('transitionEnd',fn,false);
						}
						
						obj.removeEventListener('transitionend',fn,false);
					}
			}
			if(ac.indexOf('Firefox')!=-1){
				this.style.MozTransform='rotate(-360deg)';
			}else if(ac.indexOf('Chrome')!=-1){
				this.style.WebkitTransform='rotate(-360deg)';
			}else if(ac.indexOf('Media')!=-1){
				this.style.transform='rotate(-360deg)';
			}
		}else{
				spo.style.opacity=0;
				setTimeout(function(){
					spo.style.opacity=1
					spo.innerHTML="请点击图片查看"	
				},2500)
				foots.style.transition=2.4+"s"
				foots.style.height=200+'px';
				if(ac.indexOf('Firefox')!=-1){
					this.style.MozTransform='rotate(0deg)';
				}else if(ac.indexOf('Chrome')!=-1){
					this.style.WebkitTransform='rotate(0deg)';
				}else if(ac.indexOf('Media')!=-1){
					this.style.transform='rotate(0deg)';
				}
				
				for(var i=0;i<aImg.length;i++){
						aImg[i].style.transition="0.5s "+(aImg.length-i-1)*200+"ms";
						aImg[i].style.left=0+'px';
						aImg[i].style.top=0+'px';
						if(ac.indexOf('Firefox')!=-1){
							aImg[i].style.MozTransform='rotate(0deg)';
						}else if(ac.indexOf('Chrome')!=-1){
							aImg[i].style.WebkitTransform='rotate(0deg)';
						}else if(ac.indexOf('Media')!=-1){
							aImg[i].style.transform='rotate(0deg)';
						}
						
						ap[i].style.transition="0.8s "+(ap.length-i-1)*200+"ms";
						ap[i].style.opacity=0;
						ap[i].style.left=0+'px';
						ap[i].style.top=0+'px';
				}
		}
		onOff=!onOff;
	}
	function toLT(iR,iDeg){
		return {l:Math.round(Math.sin(iDeg/180*Math.PI)*iR),
				t:Math.round(Math.cos(iDeg/180*Math.PI)*iR)
			}
	}
}