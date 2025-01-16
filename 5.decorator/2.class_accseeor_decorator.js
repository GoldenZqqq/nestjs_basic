class Class {
  set x(args) {}
  get x() {
    return 2
  }
}
// 获取类原型上的 get 和 set 方法
let { set, get } = Object.getOwnPropertyDescriptor(Class.prototype, "x")
function logged(value, context) {
  if (["setter", "getter"].includes(context.kind)) {
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(",")}`)
      const result = value.call(this, ...args)
      console.log(`ending ${context.name}`)
      return result
    }
  }
}
set = logged(set, { kind: "setter", name: "x" })
get = logged(get, { kind: "getter", name: "x" })
Object.defineProperty(Class.prototype, "x", { set, get })
let clazz = new Class()
clazz.x = 1
console.log(clazz.x)

