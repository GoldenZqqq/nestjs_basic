import { Controller, Get } from "@nestjs/common"

@Controller('a')
export class AppController {
  @Get('b')
  getHello(): string {
    return "Hello World"
  }
}
/**
 * @Controller 装饰器，用于定义控制器
 * 控制器是处理传入HTTP请求的核心组件，每个控制器负责处理特定的请求路径和对应的HTTP方法
 * 在控制器的内部会使用路由装饰器，如@Get、@Post、@Put、@Delete等，用于定义路由和处理请求的方法
 * 
 * @Get 是一个路由装饰器，用于将控制器的方法(getHello)映射到HTTP的GET请求
 * 当客户端使用GET方法访问路径'/a/b' ['a', 'b']
 * 通过 @Get 装饰器，可以指定该方法处理特定路径上的GET请求
 */
