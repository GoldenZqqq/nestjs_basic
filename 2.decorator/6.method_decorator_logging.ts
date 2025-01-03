// 方法装饰器
// 方法装饰器可以装饰方法
// (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void | PropertyDescriptor
// 1.日志记录 AOP
/**
 *
 * @param target 装饰的目标对象如果是静态成员，则是类的构造函数；如果装饰的是实例成员，则是类的原型对象
 * @param propertyKey 装饰的成员名称
 * @param descriptor 成员的属性描述符
 */
function log(target, propertyKey, descriptor) {
  // 获取老的函数
  const originMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${args}`)
    const result = originMethod.apply(this, args)
    console.log(`Result: ${result}`)
    return result
  }
}
class Calculator {
  @log
  add(a: number, b: number) {
    return a + b
  }
}

const calculator = new Calculator()
calculator.add(1, 2)
