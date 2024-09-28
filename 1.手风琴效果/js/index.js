// 每个子菜单的高度
const itemHeight = 30;

// 获取父级菜单
let titles = document.querySelectorAll(".menu h2");

// 父级菜单绑定点击事件  打开子菜单
for (let i = 0; i <titles.length ; i++) {
        titles[i].onclick = function () {
            //收起所有的菜单
            let beforeOpened = document.querySelector(".submenu[status=opened]");
            console.log(beforeOpened);
            if (beforeOpened) {
                closeSubMenu(beforeOpened);
            }

          toggleSubMenu(this.nextElementSibling);
        }
}


/**
 * 打开子菜单
 */
function openSubMenu(subMenu) {  
    //非关闭状态 （已经打开 or 正在打开）
    let status = subMenu.getAttribute("status");
     if(status != 'closed' && status) {
         return;
     }

     //设置状态为正在打开
     subMenu.setAttribute('status', 'playing');

    //将子菜单的高度从 0  变到 ？
    let to  = itemHeight * subMenu.children.length;
   createAnimation({
       from: 0 ,
       to:to,
       totalMs: 1,
       onMove : function(n) {
           subMenu.style.height =  n + 'px';
       },

       onEnd: function (){
            //设置状态为已经打开了
           subMenu.setAttribute('status', 'opened');
       }

   })
}


/**
 * 隐藏子菜单
 */
 function closeSubMenu(subMenu) {

    //非关闭状态 （已经打开 or 正在打开）
    let status = subMenu.getAttribute("status");
    if(status !== 'opened' ) {
        return;
    }

    //设置状态为正在打开
    subMenu.setAttribute('status', 'playing');

    //将子菜单的高度从 0  变到 ？

    console.log(subMenu.children)
    createAnimation({
        from: itemHeight * subMenu.children.length,
        to:0,
        totalMs: 1,
        onMove : function(n) {
            subMenu.style.height =  n + 'px';
        },

        onEnd: function (){
            //设置状态为已经打开了
            subMenu.setAttribute('status', 'closed');
        }
    })

}                                     


//切换子菜单
function  toggleSubMenu(subMenu) {
     let status = subMenu.getAttribute("status");

     if(status ==='playing') {
         //正在播放
         return;
     }else if (status == 'opened'){
         closeSubMenu(subMenu);
     }else {
         openSubMenu(subMenu)
     }
}

/**
 *
 *  通用处理动画的能力
 */
function createAnimation(options) {

    let from  = options.from; //起始值
    let to  = options.to; //终点值
    let totalMS = options.totalMS  ||  1000; //默认为1秒
    let duration  =options.duration || 15; //多久时间变化一次 毫秒
    let times = Math.floor(totalMS/duration); //变化次数
    let dis = (to - from) /times;  //每一次改变的值
    let curTimes = 0; //当前变化的次数


    let timerId = setInterval(function(){
        from+=dis;
        curTimes++;
        if(curTimes >=times) {
            // 达到变化的次数
            from = to;
            clearInterval(timerId);
            options.onEnd && options.onEnd();
        }

        //每次变化后做的事情
        options.onMove && options.onMove(from)
    },duration);

};
