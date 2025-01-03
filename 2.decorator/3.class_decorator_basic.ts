// 类装饰器 简单的类装饰
function logClass(constructor: Function) {
  console.log(`Class Created`, constructor.name)
}

@logClass
class Person {
  constructor(public name: string) {}
}

// 类装饰器工厂 是一个返回装饰器的函数，可以接收参数来控制装饰器的行为
function logClassWithParams(message: string) {
  return function (constructor: Function) {
    console.log(constructor.name, message)
  }
}
@logClassWithParams("Class Created")
class Car {}

