import "reflect-metadata"

export const createParamDecorator = (key: string) => {
  // target：控制器原型     propertyKey：方法名     parameterIndex：参数索引，先走1再走0
  return () => (target: any, propertyKey: string, parameterIndex: number) => {
    // 给控制器类的原型的propertyKey，也就是handleRequest方法属性上添加元数据
    // 属性名 params: handleRequest 的值是一个数组，数组里应该放置数据，表示哪个位置使用的是哪个装饰器
    const existingParameters =
      Reflect.getMetadata(`params`, target, propertyKey) || []
    existingParameters.push({ index: parameterIndex, key })
    console.log("existingParameters", existingParameters)
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey)
  }
}

export const Request = createParamDecorator("Request")
export const Req = createParamDecorator("Req")
