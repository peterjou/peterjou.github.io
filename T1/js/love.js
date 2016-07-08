'use strict'
window.onload=function(){
	if (navigator.userAgent.indexOf("MSIE") > -1) {
        var ss = navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 4, navigator.userAgent.indexOf("MSIE") + 9);
        if (parseInt(ss) < 9) {
           window.location = "./news.html";
        }
    }
	var den=document.getElementsByClassName('deng')[0];
	var denglu=document.getElementsByClassName('denglu')[0];
	var close=document.getElementsByClassName('close')[0];
	var amark=document.getElementsByClassName('mark')[0];
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
}