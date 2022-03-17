/*
 * @Author: leandrowhy
 * @Date: 2022-01-24 13:43:06
 * @Description: file content
 */
const Dep = {
  fnList: {},
  //订阅
  sub: function (key, fn) {
    (this.fnList[key] || (this.fnList[key] = [])).push(fn)
  },
  //发布
  pub: function () {
    let key = Array.prototype.shift.call(arguments),
      fns = this.fnList[key]
    if (fns.length === 0) return
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }
}
const dataRES = function ({ data, tag, dataKey, select }) {
  let value = '',
    el = document.querySelector(select)
  Object.defineProperty(data, dataKey, {
    get: function () {
      return value
    },
    set: function (val) {
      value = val
      //发布
      Dep.pub(tag, val)
    }
  })
  //订阅
  Dep.sub(tag, function (text) {
    el.innerText = text
  })
}