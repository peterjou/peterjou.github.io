//ajax
//method:为获取/发送方式，get/post
//url:为后台文件地址
//data:要发送或者接收的数据
//success：为回掉函数，且前面会返回参数，用data来返回，可以对返回的数据进行分析利用
function ajax(method, url, data, success) {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (method == 'get' && data) {
		url += '?' + data;
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		
	}
}

////////////////////////////////////////////////////////////
//建立cookie
//key:为保存到的key值，（好比key:value）
//value：为表单内的内容
//t:时间
function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}
//获取cookie值
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}
//删除cookie
function removeCookie(key) {
	setCookie(key, '', -1);
}

///////////////////////////////////////////////////////////////////////
//获取样式
//obj：为要获取的对象
//attr：为要获取的对象的属性
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }

//////////////////////////////////////////////////////////////////////////////////
//事件绑定
//obj:要绑定的对象
//ev：ev的时间对象
//fn:为添加的函数
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

/////////////////////////////////////////////////////////////
//获取可视区的高度，宽度
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
//////////////////////////////
//圆弧形的x/y的获取
//ir:为半径
//ideg：角度
function toLT(iR,iDeg){
	return {l:Math.round(Math.sin(iDeg/180*Math.PI)*iR),
			t:Math.round(Math.cos(iDeg/180*Math.PI)*iR)
		}
}
//////////////////////////////////////////////////////////
//添加class属性
//obj:添加属性的对象
//sclass：要添加的属性
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}
//删除class属性
//obj: 要删除的对象
//sclass:要删除的class属性
function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

////////////////////////////////////////////////
//此为多个属性同时运动
//obj:要运动的对象
//attrs:要运动的属性对象{}     //可以多个属性同时添加，需要用对象形式添加
//duration：运动时间
//fx:运动形式
//callback：回掉函数
function nTween(obj, attrs, duration, fx, callback) {
    clearInterval(obj.timer);
    var startTime = new Date().getTime();
    //var b = parseFloat(getComputedStyle(obj)[attr]);
    //var c = target - b;
    //因为要运动多个属性，并且多个属性的起始和结束的值并不一样，所有b的和c的值就不能共用，我们要根据属性的属性的不同，分别去存放b和c的值，同时存的值也要方便下面定时循环不同属性的过程中，很方便的就能找到
    //所以，我们可以定义一个对象，然后根据不同的属性存放不同的b和c
    var j = {};
    //遍历attrs，然后根据里面的值，生成不同的b和c
    for (var attr in attrs) {
        j[attr] = {}
        j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        j[attr].c = attrs[attr] - j[attr].b;
    }
    //console.dir(j);
    //return;
    var d = duration;
    obj.timer = setInterval(function() {
        var t = new Date().getTime() - startTime;
        if ( t >= d ) {
            t = d;
        }
        //根据传入进来的属性，通过遍历的方式把所有要运动的属性都计算一次
        for (var attr in attrs) {
            var b = j[attr].b;
            var c = j[attr].c;
            var value = Tween[fx](t, b, c, d);
            if ( attr == 'opacity' ) {
                obj.style[attr] = value;
            } else {
                obj.style[attr] = value + 'px';
            }
        }
        if ( t == d ) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }
        }
    }, 16);
}

////////////////////////////////////////////////////////////////////////////////
//此为运动的框架，为一个函数
//obj:为要调用的对象
//attr：为要调用对象的属性
//targrt：要达到的目的或者为路程，距离等
//duration：为所需要的时间
//fx：运动的规则，掉用
//fn回调函数
//单个属性进行运动
function mTween(obj, attr, target, duration, fx,fn) {
    clearInterval(obj.timer);
    var startTime = new Date().getTime();
    var b = parseFloat(getComputedStyle(obj)[attr]);
    var c = target - b;
    var d = duration;
    obj.timer = setInterval(function() {
        var t = new Date().getTime() - startTime;
        if ( t >= d ) {
            t = d;
            clearInterval(obj.timer);
        }
        var value = Tween[fx](t, b, c, d);
		if(attr=="opacity")
		{
			obj.style[attr] = value	
		}else
		{
       	 obj.style[attr] = value + 'px';
		}
		if ( t >= d ) {
			if(typeof fn!=='undefined')
			{	
				fn();	
			}
        }
    }, 16);
}

/////////////////////////////////////////////////////////
//滚轮事件
//obj:调用的对象
//fn1:往前的函数
//fn2：往后的函数
function move(obj,fn1,fn2){
	tex.onmousewheel=fn;				//其他浏览器滚轮事件
	tex.addEventListener('DOMMouseScroll',fn)	//火狐浏览器滚轮事件
	//封装函数，用于滚轮事件调用
	function fn(ev){
		 var dur = true;
		 //判断ev.wheelDelta是否存在
		 if(ev.wheelDelta){							//往前推为>0,为true
			 dur=ev.wheelDelta>0?true:false;		//ev.wheelDelta为其他浏览器 
		 }else{										//刚好与其他为反，往前推<0
			 dur=ev.detail<0?true:false;			//ev.detail为火狐状态的
		 }
		  ev.dur = dur;								//事件自定义属性
		 if(ev.dur){
			fn1.call(obj,ev)						//指定this指向为obj 
		 }else {
			fn2.call(obj,ev) 
		 }
		  ev.preventDefault();
		  return false;
	}
}

////////////////////////////////////////////////////////////////////////
//为左右或者上下抖动函数
//obj:为抖动的对象
//attr:为抖动的方向
//endFn:是否存在，回掉函数，可以左右抖动完后再抖动上下
function shake ( obj, attr, endFn ) {
	if ( obj.onOff ) { return; }
	obj.onOff = true;
	var pos = parseInt( getStyle(obj, attr) );			// 有隐患的
	var arr = [];
	var num = 0;
	var timer = null;
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
	clearInterval( obj.shake );
	obj.shake = setInterval(function (){
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
			obj.onOff = false;
		}
	}, 50);
}

////////////////////////////////////////////////
/*为运动方式函数
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
* */
//Tween.linear();
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}

////////////////////////////////////////////////////////////////////
//other
//删除属性
//obj:为要添加属性的对象；
//classname：要添加的属性
/*function removeClass(obj,classname)
{
	var oldClass=obj.className.split(' ');
	if(oldClass)
	{
		if(classname.sort)
		{	
			re(oldClass,classname);		//调用函数
		}else
		{
			var newa=classname.split(' ');
			re(oldClass,newa);
		}
	}
	obj.className=class1;	//给当前的bx加入属性
	//判断是否存在的封装函数
	
}
//删除属性的判断条件
//oldClass：为要添加对象的本身的属性
//newa：为要添加的数组
function re(oldClass,newa)
{
	 for(var i=0;i<newa.length;i++)
	{
		var n=oldClass.indexOf(newa[i]);
		oldClass.indexOf(newa[i])!=-1?oldClass.splice(n,1):'';	
	}
	class1=oldClass.join(' ');
}	

/////////////////////////////////////////////////////////////////////////
//添加属性
//obj:为要添加属性的对象；
//classname：要添加的属
function addClass(obj,classname)
{
	var oldClass=obj.className.split(' ');
	if(oldClass)
	{
		if(typeof classname=='object')
		{	
			ad(oldClass,classname);
		}else
		{
			var newa=classname.split(' ');
			ad(oldClass,newa);
		}
	}
	obj.className=class1;		//给当前的bx加入属性
	//判断是否存在的封装函数
	
}
//添加属性的判断条件
//oldClass：为要添加对象的本身的属性
//newa：为要添加的数组
function ad(oldClass,newa)
{
	for(var i=0;i<newa.length;i++)
	{
		oldClass.indexOf(newa[i])==-1?oldClass.push(newa[i]):'';
	}
	class1=oldClass.join(' ');
}	*/