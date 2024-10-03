/**
 * 完成瀑布流图片的案例
 * @timer: 2024年10月3号  19点58分
 * @type {number}
 */

const IMG_WIDTH = 220;
let container = document.getElementById('container');

/**
 * 获取数组最小值的方法
 */
function getMin(arr){
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {

        if(arr[i] < min ){
            min = arr[i];
        }
    }
    return min;
}

/**
 * 获取数组最大值的方法
 */
function getMax(arr){
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {

        if(arr[i] > max ){
            max = arr[i];
        }
    }
    console.log("max",max);
    return max;
}


/**
 * 计算图片的列数
 */
function calColum() {
    let containerWidth = container.clientWidth;
    //计算图片列数
    let column =  Math.floor(containerWidth/IMG_WIDTH);

    //计算总间隙
    let spaceNumber =  column + 1;
    let totalSpace = containerWidth  - (IMG_WIDTH *column);
    let space = totalSpace / spaceNumber;

    return {
        space: space,   //空隙
        column: column // 列数
    }

};

/**
 * 设置图片的位置
 */
function setPositions(){

    let  info = calColum();

    //创建数组，存放每一列的高度
    let imgArr = new Array(info.column);
    imgArr.fill(0);
    // console.log("initArr",imgArr);

    for (let i = 0; i < container.children.length; i++) {
        //获取当前图片
        let img = container.children[i];
        let minTop = getMin(imgArr);
        img.style.top = minTop + 'px';

        let index = imgArr.indexOf(minTop);
        imgArr[index] += img.height +info.space;

        let left = (index+1) * info.space + index * IMG_WIDTH;
        img.style.left = left + 'px';
    }

    // console.log("changeArr",imgArr);
     let maxHeight = getMax(imgArr);
     // 将数组中的最大数字 设置为父容器的高度
    console.log("maxHeight", maxHeight);
     container.style.height = maxHeight + 'px';

};

/**
 * 初始化图片 ，对图片位置进行归位
 * http://localhost:63342/JS_PROJECT/imgs/1.png 404 (Not Found)
 */
function initImgs(){
    for (let i = 1; i < 24; i++) {
        if(i<10){i='0'+i};
        let src = `./imgs/${i}.png`;

        let img = document.createElement("img");
        img.src= src;
        img.style.width = IMG_WIDTH + 'px';
        container.appendChild(img);
        img.onload = setPositions;  //对加载完的图片进行定位排列
    }
};

/**
 *  浏览器窗体大小改变事件
 *  重新对图片进行排列
 */
let timerId = null;
function bindEvent(){
   window.onresize = function (){
       setPositions();

       if(timerId){
           clearInterval(timerId);
       }

       // 设置函数防抖
       timerId = setTimeout(setPositions, 500);
   }
};

/**
 * 入口函数
 */
function main(){
    //1.初始化图片
    initImgs();

    //2.给可视区域绑定事件
    bindEvent();
}
main();