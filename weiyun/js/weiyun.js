'use strict'
$(function(){
	var onof=true;
	var das=data.files;
	var conid=0;
	
	//自动生成导航树
	autoshow(getChildIds(das,-1),0);
	
	//为默认页面刷新状态下的数据内容
	achange(getChildId(das,0));
	
	//自动生成上边导航栏
	autoupnav(getChildId(das,-1))
	
	//是否有数据
	autohide();
	
	//关于页面部分的宽高重新设置
	aus(onof);
	
	window.onresize=function(){
		aus(onof);
	};
	//刷新页面
	$('.shuxin').on('click',function(){
		window.location.reload();
	});
	//点击出现侧边导航栏
	
	$('.ju-ce').on('click',function(){
		if(onof){
			onof=false;
			$('.ju-ces').css({'display':'block'});
		}else{
			onof=true;
			$('.ju-ces').css({'display':'none'})	;
		};
		aus(onof);
	});
	//内容的点击事件
	$('.ju-shows').delegate($('.ju-neds'),'click',function(ev){
		var tar=ev.target;
		if(hasClass(tar, 'ju-neds')){
			achange(getChildId(das,tar.getAttribute('data-id')));
			autoupnav(getParents(das,tar.getAttribute('data-id')));
			autoshow(getChildIds(das,-1),tar.getAttribute('data-id'));
			autohide();
			conid=tar.getAttribute('data-id');
		}
		
		//关于点击小框选择
		if(hasClass(tar, 'j-checkbox')){
			if(!hasClass(tar.parentNode, 'ju-hover')){
				addClass(tar.parentNode,'ju-hover');
				addClass(tar,'ju-hovs');
				tar.style['background-position']='0 -420px';
				var nc1=0;
				var nc2=0;
				$('.j-checkbox').each(function(index,attr){
					nc1++;
					if(hasClass(attr, 'ju-hovs')){
						nc2++;
					}
				})
				if(nc1==nc2){
					$('.checks').prop('checked',true)
				}else{
					$('.checks').prop('checked',false);
				}
				
			}else{
				removeClass(tar.parentNode,'ju-hover');
				removeClass(tar,'ju-hovs');
				tar.style['background-position']='0 -370px';
				$('.checks').prop('checked',false)
			}
		}
		ev.preventDefault();
	})
	//点击上边导航栏时的下面内容的状态
	$('.ju-cs').delegate($('.ju-updrag'),'click',function(ev){
		var tar=ev.target;
		if(tar.attributes){
			if(tar.attributes[0].value=='ju-updrag'){
				//console.dir(tar)
				achange(getChildId(das,getParentone(das,tar.attributes[1].value)[0].id));
				autoupnav(getParents(das,tar.attributes[1].value));
				autoshow(getChildIds(das,-1),tar.attributes[1].value);
				autohide();
				conid=tar.attributes[1].value;
			}
		}
		ev.preventDefault();
	})
	//点击侧边栏的状态
	$('.ju-ces').delegate($('.ju-ite'),'click',function(ev){
		var tar=ev.target;
		if(hasClass(tar, 'ju-ite')){
			achange(getChildId(das,tar.getAttribute('data-id')));
			autoupnav(getParents(das,tar.getAttribute('data-id')));
			autohide();
			conid=tar.getAttribute('data-id')
			$(tar.parentNode.parentNode).addClass('ju-ccc').siblings().removeClass('ju-ccc');
		}
	})
	//新建文件夹
	$('.ju-creatdom').on('click',function(){
		var newhtml=creamdom();
		$('.ju-shows').append(newhtml)
		$('.list-nm').blur(function(){
			console.log($('.list-nm'))
			if($('.list-nm').val()!=''){
				var dats={
					id:getMaxId(das)+1,
					pid:conid,
					title:$('.list-nm').val(),
					type:'file'
				}
				das.push(dats)
				achange(getChildId(das,conid));
				autoupnav(getParents(das,conid));
				autoshow(getChildIds(das,-1),conid);
				autohide();
			}else{
				$('.j-lists1').remove()
			}
		})
	})
	
	//给全选定义状态
	var kess=true;
	$('.checks').on('click',function(){
		if(kess){
			$('.j-list').addClass('ju-hover');
			$('.ju-le').addClass('ju-hovs');
			$('.ju-le').css({'background-position':'0 -420px'})
			kess=false;
		}else{
			$('.j-list').removeClass('ju-hover');
			$('.ju-le').removeClass('ju-hovs');
			$('.ju-le').css({'background-position':'0 -370px'})
			kess=true;
		}
	})
	
	//重命名
	$('.ju-renm').on('click',function(){
		//重命名只能选择一个操作
		var nos=0;
		$('.j-checkbox').each(function(index,attr){
			if(hasClass(attr, 'ju-hovs')){
				nos++;
				if(nos>1){
					alert('重命名只能选择一个进行修改');
					return;
				}
			}
		})
		$('.j-checkbox').each(function(index,attr){
			if(hasClass(attr, 'ju-hovs')){
				if(nos>1){
					return;
				}else{
					$('.ju-nameshow').eq(index).css({'display':'block'})
					$('.list-name').eq(index).blur(function(){
						if($('.list-name').eq(index).val()!=''){
							
							rename(das,attr.getAttribute('data-id'), $('.list-name').eq(index).val());
							$('.ju-nameshow').eq(index).css({'display':'none'});
							var nnn=getParentone(das,attr.getAttribute('data-id'))[0].pid;
							
							achange(getChildId(das,nnn));
							autoupnav(getParents(das,nnn));
							autoshow(getChildIds(das,-1),nnn);
							autohide();
						}else{
							$('.ju-nameshow').eq(index).css({'display':'none'});
						}
					})
				}
			}
		})
	})
	//删除
	$('.ju-del').on('click',function(){
		 //deleteFile(dataList,id)
		 $('.j-checkbox').each(function(index,attr){
			if(hasClass(attr, 'ju-hovs')){			
				deleteFile(das,attr.getAttribute('data-id'));
			}
		})
		 achange(getChildId(das,conid));
		autoupnav(getParents(das,conid));
		autoshow(getChildIds(das,-1),conid);
		autohide();
	})
	//点击上传
	$('.ju-com').change(function(){
		console.log($(this).val())
	})
});


//新建文件夹
function creamdom(){
	var html='';
	html=`<div class="j-lists1 j-list" style="height:106px;top:-18px;">
			<label class="j-checkbox"></label>
			<div class="ju-libg ju-neds" >
				<i class="ju-neds" ></i>
			</div>
			<p class="ju-names">
				<span ></span>
				<span style="position:absolute;left:0;top:78px;width:108px;" class="addnew">
					<input type="text" name="text" autofocus class="list-nm" autocomplete='false' style="width:100px;margin:0 auto;"/>
				</span>
			</p>
		</div>`;
	return html;
}

//关于自动生成导航树
function autoshow(das,n){
		var html='';
		for(var i=0;i<das.length;i++){
			var tcn=das[i].id==n?'ju-ccc':'';
				var cns=das[i].pid==0?'block':'block';
				if(getChilds(das,das[i].id)){
					html+=`<div class="ju-item ju-ite ${tcn}" style="padding-left:${(getLv(das,das[i].id)*14+'px')};display:${cns}" data-id="${das[i].id}">
							<a href="javascript:;" class="ju-ite" data-id="${das[i].id}">
								<span class="ju-ite" data-id="${das[i].id}">${das[i].title}</span>
								<i class="ju-active ju-ite" data-id="${das[i].id}" ></i>
							</a>
						</div>`;
				}else{
					html+=`<div class="ju-item ju-ite ${tcn}" style="padding-left:${(getLv(das,das[i].id)*14+'px')};display:${cns}" data-id="${das[i].id}">
							<a href="javascript:;" class="ju-ite" data-id="${das[i].id}">
								<span class="ju-ite" data-id="${das[i].id}">${das[i].title}</span>
							</a>
						</div>`;
				};
			
		};
		$('.ju-ces').html(html);
		
	};
//自动生成上边导航栏
function autoupnav(data){
	var html='';
	var cnc=100;
	for(var i=data.length-1;i>=0;i--){
		cnc-=10;
		if(i==0){
			
			html+=`<a href="javascript:;" class="ju-updrag" data-id="${data[i].id}"  style="background-position: right -200px; z-index:${cnc};">
										<span class="ju-updrag" data-id="${data[i].id}" >${data[i].title}</span>
									</a>`;
									break
		}
		html+=`<a href="javascript:;" data-id="${data[i].id}" style="z-index:${cnc}" class="ju-updrag">
										<span class="ju-updrag" data-id="${data[i].id}" >${data[i].title}</span>
									</a>`;
	}
	$('.ju-cs').html(html)
}

//关于侧边导航栏的显示
function aus(onof){
		$('.ju-val').css({'width':$(window).width()-161});
		$('.ju-content').css({'height':$(window).height()-51});
		$('.ju-all').css({'height':$(window).height()-114});
		if(!onof){
			$('.ju-cc').css({'width':$(window).width()-330})
		}else{
			$('.ju-cc').css({'width':$(window).width()-170})
		}
		
	}
//自动生成关于页面的数据内容
	function achange(data){
		var xhtml='';
		for(var i=0;i<data.length;i++){
			xhtml+=`<div class="j-list" >
									<label class="j-checkbox ju-le" data-id="${data[i].id}"></label>
									<div class="ju-libg ju-neds" data-id="${data[i].id}">
										<i class="ju-neds " data-id="${data[i].id}"></i>
									</div>
									<p class="ju-names">
										<span >${data[i].title}</span>
										<span style="position:absolute;left:0;top:78px;width:108px; display:none;" class="ju-nameshow">
											<input type="text" name="text" class="list-name" autofocus autocomplete='false' style="width:100px;margin:0 auto;"/>
										</span>
									</p>
								</div>`
		}
		$('.ju-shows').html(xhtml)
	}
	//关于页面的是否有数据显示不同的内容
	function autohide(){
		if($('.ju-shows').html()==''){
			$('.ju-no').css({'display':'block'})
		}else{
			$('.ju-no').css({'display':'none'})
		}
	}