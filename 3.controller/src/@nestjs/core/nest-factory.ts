import { NestApplication } from "./nest-appliction"
import { Logger } from "./logger"

export class NestFactory {
  static async create(module: any) {
    // 启动 Nest 应用
    Logger.log("Starting Nest application...", "NestFactory")
    // 创建一个 Nest 应用实例
    const app = new NestApplication(module)
    // 返回这个实例
    return app
  }
}
