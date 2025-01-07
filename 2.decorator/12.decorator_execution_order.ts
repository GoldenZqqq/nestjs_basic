// 不同类型的装饰器的执行顺序
/**
 * 1.属性装饰器、方法装饰器、访问器装饰器它们是按照在类中出现的顺序，从上往下依次执行
 * 2.类装饰器最后执行
 * 3.参数装饰器先与方法执行
 */
/* 类装饰器 */
function classDecorator1(target: any) {
  console.log("classDecorator1")
}
function classDecorator2(target: any) {
  console.log("classDecorator2")
}
/* 属性装饰器 */
function propertyDecorator1(target: any, propertyKey: string) {
  console.log("propertyDecorator1")
}
function propertyDecorator2(target: any, propertyKey: string) {
  console.log("propertyDecorator2")
}
/* 方法装饰器 */
function methodDecorator1(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("methodDecorator1")
}
function methodDecorator2(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("methodDecorator2")
}
/* 访问器装饰器 */
function accessorDecorator1(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("accessorDecorator1")
}
function accessorDecorator2(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("accessorDecorator2")
}
/* 参数装饰器 */
function parameterDecorator4(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator4", propertyKey) // propertyKey 方法名
}
function parameterDecorator3(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator3", propertyKey) // propertyKey 方法名
}
function parameterDecorator2(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator2", propertyKey) // propertyKey 方法名
}
function parameterDecorator1(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator1", propertyKey) // propertyKey 方法名
}

/* ================= start ================= */
@classDecorator1
@classDecorator2
class Example {
  @accessorDecorator1
  @accessorDecorator2
  get myProp() {
    return this.prop
  }
  @propertyDecorator1
  @propertyDecorator2
  prop: string
  @methodDecorator1
  @methodDecorator2
  method(
    // 如果一个方法有多个参数，参数装饰器会从右向左执行
    // 一个参数也可能会有多个参数装饰器，这些装饰器也是从右向左执行的
    @parameterDecorator4 @parameterDecorator3 param1: string,
    @parameterDecorator2 @parameterDecorator1 param2: string
  ) {}
}
/* ================= end ================= */
