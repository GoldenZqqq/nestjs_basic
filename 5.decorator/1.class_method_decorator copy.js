function logged(value, context) {
  console.log("value", value)
  console.log("context", context)

  if (context.kind === "method") {
    // 说明这是一个类的方法装饰器
    return function (...args) {
      console.log(`starting ${context.name} with arguments ${args.join(",")}`)
      const result = value.call(this, ...args)
      console.log(`ending ${context.name}`)
      return result
    }
  }
}
class Class {
  sum(a, b) {
    return a + b
  }
}
Class.prototype.sum =
  logged(Class.prototype.sum, {
    kind: "method",
    name: "sum"
  }) ?? Class.prototype.sum
console.log(new Class().sum(1, 2))
