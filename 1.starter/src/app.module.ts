import { AppController } from "./app.controller"
import { Module } from "@nestjs/common"

@Module({
  controllers: [AppController]
})
export class AppModule {}

/**
 * @Module 装饰器，用于定义模块
 * 1. 用于创建NestJS模块
 * 2. 提供元数据，用于描述模块的配置和依赖关系
 * 3. 可以包含控制器、提供者、管道、过滤器等
 */
