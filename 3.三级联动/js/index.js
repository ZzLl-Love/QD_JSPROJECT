// 省份 城市 学校 相关DOM结构
let provinceParentDOM = document.getElementById("province");
let cityParentDOM = document.getElementById("city");
let schoolParentDOM = document.getElementById("school");


/**
 *通用创建optionDOM
 */
function createOption(value, text, parentDOM) {
    let optionDOM = document.createElement("option");
    optionDOM.value = value;
    optionDOM.innerHTML = text;
    parentDOM.appendChild(optionDOM);
}

/**
 * 删除dom 和他的子DOM
 */
function deleteOldDOM(dom) {
    console.log(dom);
    while(dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }
}


//初始化省市列表
for (let prop in provinceData) {
    createOption(prop, provinceData[prop], provinceParentDOM);
}

// 给省份 添加一个 改变事件  省份改变---->渲染城市列表
provinceParentDOM.onchange = function () {
    let p = provinceParentDOM.value;
    if( p ==='0001' || !p) {
        deleteOldDOM(cityParentDOM);
        deleteOldDOM(schoolParentDOM)
        return;
    }
    //删除原有的对象
    deleteOldDOM(cityParentDOM);
    //删除原有的学校对象
    deleteOldDOM(schoolParentDOM)
    //赋值新的值
    if(cityData[p]){
        for (let prop in cityData[p]) {
            createOption(prop,cityData[p][prop], cityParentDOM);
        }
    }
    //给城市和学校一个默认值
    cityParentDOM.value = cityParentDOM.children[0].value;
    cityParentDOM.dispatchEvent(new Event('change'));
};

//根据城市选择学校 测试改变 ----> 选择学校
cityParentDOM.onchange = function () {

    //获取当前选中的测试
    let selectedCity = cityParentDOM.value;

    //删除原有的学校对象
    while(schoolParentDOM.firstChild) {
        schoolParentDOM.removeChild(schoolParentDOM.firstChild);
    }
    deleteOldDOM(schoolParentDOM)

    if(schoolData[selectedCity]) {
        for (let prop of schoolData[selectedCity]) {
            createOption(null,prop,schoolParentDOM)
        }
    }else{
        alert("未存在对应的测试下的学校");
    }
};



