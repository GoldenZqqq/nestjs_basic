import "reflect-metadata"

export function Get(path: string = ""): MethodDecorator {
  /**
   * target: 类的原型 AppController.prototype
   * propertyKey: 方法名 index
   * descriptor: 方法的描述符 index方法的属性描述器
   */
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 给descriptor.value方法增加，也就是index函数添加元数据 path=path
    Reflect.defineMetadata("path", path, descriptor.value)
    // 给descriptor.value方法增加，也就是index函数添加元数据 method=GET
    Reflect.defineMetadata("method", "GET", descriptor.value)
  }
}
export function Post(path: string = ""): MethodDecorator {
  /**
   * target: 类的原型 AppController.prototype
   * propertyKey: 方法名 index
   * descriptor: 方法的描述符 index方法的属性描述器
   */
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 给descriptor.value方法增加，也就是index函数添加元数据 path=path
    Reflect.defineMetadata("path", path, descriptor.value)
    // 给descriptor.value方法增加，也就是index函数添加元数据 method=GET
    Reflect.defineMetadata("method", "POST", descriptor.value)
  }
}
