import { Logger } from "./logger"
import express, { Express } from "express"

export class NestApplication {
  // 在它的内部私有化一个Express实例
  private readonly app: Express = express()
  constructor(protected readonly module) {
    Logger.log("Nest application successfully started", "NestApplication")
  }
  // 初始化
  async init() {}
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
