/*
*说出打印结果，并说出原因
*/

const a = { x: 1 };
const b = { ...a };
const c = {};
Object.assign(c, a);
a.x = 2;
console.log(a.x);
console.log(b.x);
console.log(c.x);

//2,1,1


/*
*使用数组的缩减函数从数字数组中找到最小的值
*/

const arr = [5, 10, 12, 4, 2];
//如下
let minNum = arr.reduce((totalNum, val) => {
  if (totalNum > val) {
    return val;
  }
  return totalNum;
});
console.log(minNum);


/*
* @ 如何使用setTimeout实现setInterval的效果
*/
function zSetInterval(fn, wait) {
  function interval() {
    setTimeout(interval, wait);
    fn();
  }
  setTimeout(interval,wait)
}
