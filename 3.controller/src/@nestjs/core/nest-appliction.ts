import "reflect-metadata"
import { Logger } from "./logger"
import express, { Express } from "express"

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
    }
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
