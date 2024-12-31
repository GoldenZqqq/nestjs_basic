// 用于创建 Nest 应用的实例
import { NestFactory } from "@nestjs/core"
// 导入根模块
import { AppModule } from "./app.module"

// 定义一个异步函数用来创建Nestjs实例并启动应用
async function bootstrap() {
  // 创建Nestjs应用实例
  const app = await NestFactory.create(AppModule)
  // 在底层其实使用的是Express作为底层服务器
  // 监听3000端口
  await app.listen(3000)
}
bootstrap()
