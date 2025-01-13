import "reflect-metadata"

export const createParamDecorator = (key: string) => {
  // target：控制器原型     propertyKey：方法名     parameterIndex：参数索引，先走1再走0
  return (data?: any) =>
    (target: any, propertyKey: string, parameterIndex: number) => {
      // 给控制器类的原型的propertyKey，也就是handleRequest方法属性上添加元数据
      // 属性名 params: handleRequest 的值是一个数组，数组里应该放置数据，表示哪个位置使用的是哪个装饰器
      const existingParameters =
        Reflect.getMetadata(`params`, target, propertyKey) || []
      existingParameters[parameterIndex] = { parameterIndex, key, data }
      Reflect.defineMetadata(`params`, existingParameters, target, propertyKey)
    }
}

export const Request = createParamDecorator("Request")
export const Req = createParamDecorator("Req")
export const Query = createParamDecorator("Query")
export const Headers = createParamDecorator("Headers")
export const Session = createParamDecorator("Session")
export const Ip = createParamDecorator("Ip")
export const Param = createParamDecorator("Param")
export const Body = createParamDecorator("Body")
export const Response = createParamDecorator("Response")
export const Res = createParamDecorator("Res")
export const Next = createParamDecorator("Next")
