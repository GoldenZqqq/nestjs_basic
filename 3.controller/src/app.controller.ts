import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  // 使用Get装饰器标记index方法为HTTP GET路由处理程序
  @Get()
  index(): string {
    return "hello"
  }
  @Get("info")
  main(): string {
    return "info"
  }
}
