//数组
//push pop shift unshift indexOf slice splice join concat
(function (window) {
    // 定义的是公共的方法
    // 自己模仿数组的方法
    var myPrototype={
        push:function (value) {
            this[this.length] = value;
            this.length++;
            return this.length;
        },
        pop:function () {
            var thisDelete = this[this.length-1];
            delete this[this.length-1];
            this.length--;
            return thisDelete;
        },
        shift:function () {
            var first = this[0];
            for (let i = 0; i < this.length; i++) {
                this[i] = this[i+1];
            }
            this.pop();
            return first;
        },
        unshift:function () {
            var length = arguments.length;
            var newLength = this.length + length;
            // 从后往前复制
            for (let i = newLength-1; i >=0; i--) {
                // 小于传进来的就直接赋值参数
                if (i<length) {
                    this[i]=arguments[i];
                }else {
                    this[i]=this[(i-length)];
                }
            }
            this.length+=length;
            return this.length;
        },
        indexOf:function () {
            var length = arguments.length;
            var i=0;
            if (length === 2) {
                i=arguments[1];
            }
            for (i; i < this.length; i++) {
                if (arguments[0]===this[i]) {
                    return i;
                }
            }
            return -1;
        },
        slice:function () {
            var res= createArray();
            var aLength = arguments.length;
            let i=arguments[0];
            var target = this.length;
            if (aLength === 2) {
                target = arguments[1];
            }
            for (i; i < target; i++) {
                res[i]=this[i];
            }
            res.length=target-arguments[0];
            return res;
        },
        join:function () {
            var res='';
            var joinStr = ',';
            if (arguments.length>0) {
                joinStr=arguments[0];
            }
            for (let i = 0; i < this.length; i++) {
                res=`${res}${joinStr}${this[i]}`;
            }
            return res.length>0 ? res.slice(1) : '';
        },
        concat:function (value) {
            var result = createArray();
            // 将当前数组（this）复制到结果数组中
            for (let i = 0; i < this.length; i++) {
                result.push(this[i]);
            }
            // 遍历所有参数
            if (value.push===this.push) {
                for (let i = 0; i <value.length ; i++) {
                    if (value[i].push===this.push) {
                        result=result.concat(value[i]);
                    }else{
                        result.push(value[i]);
                    }
                }
            }else{
                result.push(value);
            }
            return result;
        },
    };
    function createArray() {
        var res ={};
        // console.log(arguments);
        for (const key in arguments) {
            res[key] = arguments[key];
        }
        res.length=arguments.length;
        res.__proto__ = myPrototype;
        return res;
    }
    window.createArray = createArray;
})(window)

var a1 = createArray(1,2,3);
var a2 = createArray(4,5,6);
var a3 = createArray(7,8);
a2.push(a3);
console.log(a1)
console.log(a2)