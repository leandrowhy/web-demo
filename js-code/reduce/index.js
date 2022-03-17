/*
 * @Author: leandrowhy
 * @Date: 2022-03-15 13:09:48
 * @Description: file content
 */
function reduce(fn, init) {
  let self = this
  if (typeof fn !== 'function') {
    new Error('fn is not Function')
    return
  }
  if (!Array.isArray(self)) {
    new Error('this is not Array')
    return
  }
  let i = 1;
  let total = self[0]
  if (init != undefined) {
    total = init
    i = 0
  }
  for (; i < self.length; i++) {
    total = fn(total, self[i], i, self)
  }
  return total
}

Array.prototype.myReduce = reduce
console.log([1, 2, 3].myReduce((total, value) => total + value));