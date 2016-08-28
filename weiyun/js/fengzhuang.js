//此文件为封装函数，主要为获取对应id下的子元素/找对应的父级/获取在第几层/自己下面是否含有子元素/

//获取对应id下面的子元素
function getChildId(arr,pid){
	var newsArr=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i].pid==pid){
			newsArr.push(arr[i])
		}
	}
	return newsArr;
}
//获取对应id下面的所有子元素
function getChildIds(arr,pid){
	var newsArr=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i].pid==pid){
			newsArr.push(arr[i])
			newsArr = newsArr.concat(getChildIds(arr,arr[i].id));
			//break;
		}
	}
	return newsArr;
}

//获取排序后的index值
function getindex(das ,id){
	var cns=getChildIds(das,-1)
	for(var i=0;i<cns.length;i++){
		if(cns[i].id==id){
			return i;
		}
	}
	return -1;
}

//这个id是否有子元素
function getChilds(data,id){
	return getChildId(data,id).length !== 0;
}
//获取对应id的所有父级（递归）
function getParents(arr,id){
	var url=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id){
			url.push(arr[i]);
			url = url.concat(getParents(arr,arr[i].pid));
			break;
		}
	}
	return url
}
//获取对应id的父级（1个）
function getParentone(arr,id){
	var url=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id){
			url.push(arr[i]);
		}
	}
	return url
}
//获取当前id在第几层
function getLv(data,id){
	return getParents(data,id).length;
}
//找到当前数据的所有父级的name名字
function getParentsNameAll(currentId){
	return getParents(currentId).map(function (item){
		return item.name
	});
}
/*
 * 获取最大的id值
 * */
function getMaxId( dataList ) {
    var maxId = dataList[0].id;
    dataList.forEach(function(v, k) {
        if ( v.id > maxId ) {
            maxId = v.id;
        }
    })
    return maxId;
}

/*
* 重命名
* */
function rename(dataList,id, newName) {
    dataList.forEach(function(v, k) {
        if (v.id == id) {
            v.title = newName;
        }
    });
}
/*
 * 删除文件
 * */
function deleteFile(dataList,id) {
    for (var i=0; i<dataList.length; i++) {
        if (dataList[i].id == id) {
            dataList.splice(i, 1);
            return;
        } 
    }
}