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
function parameterDecorator1(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator1", propertyKey) // propertyKey 方法名
}
function parameterDecorator2(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("parameterDecorator2", propertyKey) // propertyKey 方法名
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
  method(@parameterDecorator1 @parameterDecorator2 param: string) {}
}
/* ================= end ================= */
