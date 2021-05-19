# js笔试面试 基础知识
### 1.js typeof会返回的数据类型有哪些
object,string,undefined,number,function,boolean
>基本数据类型
>string,number,boolean,undefined,null

### 2.列举三种强制类型转换以及两种隐式类型转换
强制转换： parseInt()  parseFloat()  Number() toString()
隐式转换： ==   !!   +''

### 3.创建数组的方法
```js
var arr = new Array()
var arr = []
Array.of(1,2) //[1,2]
```
### 4.判断是否为数组
```js
let arr = []
console.log(arr instanceof Array)
console.log(Array.isArray(arr))
console.log(arr.construct == Array)
console.log(Object.prototype.toString.call(arr) == '[object Array]')
```
### 5.pop(),push(),unshift(),shift() 的作用
- pop  尾部删除数据
- push 尾部插入数据
- unshift 头部插入数据
- shift 头部删除数据

### 6.call apply bind 的区别
相同处：都是改变了this的指向

其中call和apply 函数会立即执行

bind 不会 因为 bind返回的是一个函数 需要自己在调用一次

而call和apply的不同处在于第二个值  call想要传值进去得一个一个的传 而apply则是写成数组

### 7.null 和 undefind的区别
- null表示一个空的对象，转为数组为0,undefined表示一个空的原始值,转为数值为NAN
- undefined指本该有一个值的，只是没有给它定义，而null表示没有对象，不应该有值

### 8.js的垃圾回收方式
- 标记清除：例如函数中声明了一个变量，将其标记为进入环境，当变量离开环境时（即函数执行结束），标记为离开环境，就回收。
- 引用计数：跟踪记录每个值被引用的次数。声明一个变量，并将引用类型赋值给这个变量，则这个值的引用次数就+1，如果变量的值发生了改变，变成了另外一个值，那么这个值引用次数就-1，当值的引用次数为0的时候就回收。

### 9.闭包
- 闭包就是函数里面嵌套一个函数
- 内层函数使用了外层函数的参数或者定义的变量
- 从而就形成了闭包

##### 经典闭包
```js
var a = 333;
function fn(){
    var a = 123;
    return function (){
        console.log(a)
    }
}
let b = fn()
b()//123
----------------------

for(var i=0;i<3;i++){
     setTimeout(()=>{
        console.log(i)
    },1)
}
// 执行结果为 3,3,3

//采用闭包
for (var i = 0; i < 3; i++) {
    (function fn(i) {
      return setTimeout(() => {
        console.log(i);
      }, 1);
    })(i);
}
// 执行结果为 0，1，2
```

### 10.new操作符到底干了什么
- 创建了一个新对象（内部生成一个this={}）
- 将构造函数的作用域赋值给新对象（然后this就指向了这个新对象）
- 执行构造函数内的代码（为这个新对象添加属性）
- 最后返回这个新对象（内部会执行这样的代码 return this）

### 11.数组去重
使用Es6语法 Set去重
```js
let arr = [1,2,2,2,1,1,3,2,3,3,4]
console.log(new Set(arr))
// [1,2,3,4]
```
indexOf() 可以返回某个指定的字符串值在字符串中首次出现的位置 ==-1则为没有
```js
let arr = [1,2,2,2,1,1,3,2,3,3,4]
function unique(arr){
    let nArr = []
    arr.map(e=>{
        if(nArr.indexOf(e) == -1){
            nArr.push(e)
        }
    })
    return nArr
}
console.log(unique(arr))
// [1,2,3,4]
```
通过对象的属性 来判断是否已有相同值
```js
let arr = [1,2,2,2,1,1,3,2,3,3,4]
function unique(arr){
    let obj={}
    let nArr=[]
    arr.map(e=>{
        if(!obj[e]){
            obj[e] = true
            nArr.push(e)
        }
    })
    return nArr
}
console.log(unique(arr))
// [1,2,3,4]
```



