/**
 * @timer: 2024年9月25号 20:55
 * @Author: ZzTop
 * 支持复选框的联动
 * 指标表头数据的排序
 *
 * today: 今日目标，弄明白如下代码
 */
(function () {

    var checkAll = document.getElementById("checkAll");

    var tbody = document.getElementsByTagName('tbody')[0];

    var checkOneLists = tbody.getElementsByTagName('input')

    //表头集合
    var ths = document.getElementsByTagName('th');

    //每一行数据
    var rows = tbody.getElementsByTagName('tr');


    /**
     * 程序入口定义
     */
    var init = function () {
        // console.log("入口");
        initEvents();
    };

    /**
     * 绑定所有的事件函数
     */
    var initEvents = function () {
        // console.log("事件函数执行....")
        checkAll.addEventListener("click", onCheckAllClick)

        //通过事件委托的形式为每一个复选框进行事件的绑定  why: 表格中的数据是服务端传递过来的，可能有/无
        tbody.addEventListener('click', onCheckOneListClick);

        //给表头绑定事件 ,支持排序
        for (let i = 0; i < ths.length; i++) {
            //使用闭包的形式获取索引值
            handleThsClickFn(ths[i], i);
            // ths[i].addEventListener("click", );
        }
    };


    /**
     * [全选按钮] 事件绑定函数
     */
    function onCheckAllClick() {
        var checkStatus = this.checked
        for (let i = 0; i < checkOneLists.length; i++) {
            checkOneLists[i].checked = checkStatus;
        }
    };

    /**
     * [单个复选框] 点击事件
     */
    function onCheckOneListClick(event) {
        if (event.target.tagName !== 'INPUT') {
            return;
        }

        //已经选中的复选框的个数
        var checkNumber = 0;
        for (let i = 0; i < checkOneLists.length; i++) {
            checkOneLists[i].checked && checkNumber++;
        }

        checkAll.checked = checkNumber === checkOneLists.length
    };

    /**
     * 表格表头排序
     * @param: 每一个表头
     * @index: 索引值 第几个表头
     */
    function handleThsClickFn(th, index) {


        if (typeof (th) === 'undefined') {
            alert('请选择表头')
        }

        //表头复选框不需要排序 直接return
        if (index === 0) {
            return
        }

        th.addEventListener('click', function () {
            var arr = Array.prototype.slice.call(rows).sort( //将类数组 ---->数组
                function (a, b) {
                    //中文排序
                    if (index === 2 || index === 4) {
                        return a.getElementsByTagName('td')[index].innerHTML.localeCompare(
                            b.getElementsByTagName('td')[index].innerHTML, 'zh'
                        )
                    } else {
                        //数字排序
                        return a.getElementsByTagName('td')[index].innerHTML - b.getElementsByTagName('td')[index].innerHTML;
                    }
                });

            // 循环排序好的数组
            for (let i = 0; i < arr.length; i++) {

                tbody.appendChild(arr[i])
            }
        })
    };

    init();
})();