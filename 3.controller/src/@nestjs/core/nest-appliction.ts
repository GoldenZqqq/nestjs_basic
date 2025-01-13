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
    this.app.use(express.json()) // 用于把JSON格式的请求体对象放在req.body上
    this.app.use(express.urlencoded({ extended: true })) // 用于把form表单格式请求体对象放在req.body上
  }
  use(middleware) {
    this.app.use(middleware)
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
        const redirectUrl = Reflect.getMetadata("redirectUrl", method)
        const redirectStatusCode = Reflect.getMetadata(
          "redirectStatusCode",
          method
        )
        const statusCode = Reflect.getMetadata("statusCode", method)
        const headers = Reflect.getMetadata("header", method)
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
            // 执行路由处理函数，获取返回值
            const result = method.call(controller, ...args)
            if (result?.url) {
              return res.redirect(result.statusCode || 302, result.url)
            }
            // 判断如果需要重定向，则直接重定向到指定的redirectUrl
            if (redirectUrl) {
              return res.redirect(redirectStatusCode || 302, redirectUrl)
            }
            if (statusCode) {
              res.statusCode = statusCode
            } else if (httpMethod === "POST") {
              res.statusCode = 201
            }
            // 判断controller的methodName方法里有没有使用Response或Res装饰器，如果用任何一个则不发响应
            const responseMetadata = this.getResponseMetadata(
              controller,
              methodName
            )
            // 或者没有注入Response参数装饰器，或者注入了但是传递了passthrough参数，都会由Nest.js来返回响应
            if (!responseMetadata || responseMetadata?.data?.passthrough) {
              headers.forEach(({ name, value }) => {
                res.setHeader(name, value)
              })
              // 把返回值序列化，然后返回给客户端
              res.send(result)
            }
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
  private getResponseMetadata(controller, methodName) {
    const paramsMetadata =
      Reflect.getMetadata(`params`, controller, methodName) ?? []
    return paramsMetadata
      .filter(Boolean)
      .find(param => ["Response", "Res", "Next"].includes(param.key))
  }
  // 解析参数
  private resolveParams(
    instance: any,
    methodName: string,
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ) {
    const paramsMetadata =
      Reflect.getMetadata(`params`, instance, methodName) ?? []

    return paramsMetadata.map(({ key, data }) => {
      switch (key) {
        case "Request":
        case "Req":
          return req
        case "Query":
          return data ? req.query[data] : req.query
        case "Headers":
          return data ? req.headers[data] : req.headers
        case "Session":
          return data ? req.session[data] : req.session
        case "Ip":
          return req.ip
        case "Param":
          return data ? req.params[data] : req.params
        case "Body":
          return data ? req.body[data] : req.body
        case "Response":
        case "Res":
          return res
        case "Next":
          return next
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
