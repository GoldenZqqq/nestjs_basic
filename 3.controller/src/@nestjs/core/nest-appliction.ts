import "reflect-metadata"
import { Logger } from "./logger"
import express, {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from "express"
import path from "path"

export class NestApplication {
  // 在它的内部私有化一个Express实例
  private readonly app: Express = express()
  constructor(protected readonly module) {
    Logger.log("Nest application successfully started", "NestApplication")
  }
  // 初始化
  async init() {
    // 取出模块里所有的控制器，然后做好路由配置
    const controllers = Reflect.getMetadata("controllers", this.module) || []
    Logger.log(`AppModule dependencies initialized`, "IntanceLoader")
    for (const Controller of controllers) {
      // 创建每个控制器的实例
      const controller = new Controller()
      // 获取控制器的路径前缀
      const prefix = Reflect.getMetadata("prefix", Controller) || "/"
      // 开始解析路由
      Logger.log(`${Controller.name} {${prefix}}`, "RoutesResolver")
      const controllerPrototype = Reflect.getPrototypeOf(controller)
      // 遍历控制器原型上的所有方法
      for (const methodName of Object.getOwnPropertyNames(
        controllerPrototype
      )) {
        const method = controllerPrototype[methodName]
        // 取得此函数上绑定的方法名的元数据
        const httpMethod = Reflect.getMetadata("method", method)
        // 取得此函数上绑定的路径的元数据
        const pathMetadata = Reflect.getMetadata("path", method)
        // 如果方法名不存在，则不处理
        if (!httpMethod) continue
        // 拼出完整路由路径
        const routePath = path.posix.join("/", prefix, pathMetadata)
        // 将方法绑定到路由上，当客户端以httpMethod方法请求routePath路径的时候，会由对应的函数进行处理
        this.app[httpMethod.toLowerCase()](
          routePath,
          (
            req: ExpressRequest,
            res: ExpressResponse,
            next: ExpressNextFunction
          ) => {
            const args = this.resolveParams(
              controller,
              methodName,
              req,
              res,
              next
            )
            const result = method.call(controller, ...args)
            res.send(result)
          }
        )
        Logger.log(
          `Mapped (${routePath}, ${httpMethod.toUpperCase()}) route`,
          "RoutesResolver"
        )
      }
      Logger.log(`Nest application successfully started`, "InstanceLoader")
    }
  }
  // 解析参数
  private resolveParams(
    instance: any,
    methodName: string,
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ) {
    const paramsMetadata = Reflect.getMetadata(`params`, instance, methodName) || []
    if (!Array.isArray(paramsMetadata)) {
      return []
    }
    
    return paramsMetadata
      .sort((a, b) => a.parameterIndex - b.parameterIndex)
      .map(({ key }) => {
        switch (key) {
          case "Request":
          case "Req":
            return req
          default:
            return null
        }
      })
  }
  // 启动HTTP服务器
  async listen(port) {
    await this.init()
    // 调用express实例的listen方法启动一个HTTP服务器，监听port端口
    this.app.listen(port, () => {
      Logger.log(
        `Appliction is running on http://localhost:${port}`,
        "NestApplication"
      )
    })
  }
}
