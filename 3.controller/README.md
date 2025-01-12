# NestJS 控制器详解

## 核心依赖
- @nestjs/core 是 NestJS 的核心库，提供了创建和管理 NestJS 应用程序的必要功能
- @nestjs/common 是 NestJS 的常用功能库，提供了常用的装饰器、中间件、管道等

## 控制器概念
- 控制器负责处理传入的请求和向客户端返回响应
- 使用装饰器定义路由和请求方法
- 一个控制器可以包含多个路由处理程序

### 控制器装饰器
1. @Controller()
   - 定义控制器的基本路由前缀
   - 可以接收字符串参数作为路由前缀
   ```typescript
   @Controller('cats')
   export class CatsController {}
   ```

2. 请求方法装饰器
   - @Get()：处理 GET 请求
   - @Post()：处理 POST 请求
   - @Put()：处理 PUT 请求
   - @Delete()：处理 DELETE 请求
   - @Patch()：处理 PATCH 请求
   - @Options()：处理 OPTIONS 请求
   - @Head()：处理 HEAD 请求
   - @All()：处理所有 HTTP 方法

### 请求参数装饰器
1. @Param()
   - 获取路由参数
   ```typescript
   @Get(':id')
   findOne(@Param('id') id: string) {}
   ```

2. @Query()
   - 获取查询字符串参数
   ```typescript
   @Get()
   findAll(@Query() query: any) {}
   ```

3. @Body()
   - 获取请求体数据
   ```typescript
   @Post()
   create(@Body() createCatDto: CreateCatDto) {}
   ```

4. @Headers()
   - 获取请求头信息
   ```typescript
   @Get()
   findAll(@Headers('user-agent') userAgent: string) {}
   ```

### 响应处理
1. 状态码装饰器
   - @HttpCode()：设置响应状态码
   ```typescript
   @Post()
   @HttpCode(204)
   create() {}
   ```

2. 响应头装饰器
   - @Header()：设置响应头
   ```typescript
   @Get()
   @Header('Cache-Control', 'none')
   findAll() {}
   ```

3. 重定向装饰器
   - @Redirect()：重定向请求
   ```typescript
   @Get()
   @Redirect('https://nestjs.com', 301)
   ```

## 异步处理
- 控制器方法支持 async/await
- 可以返回 Promise 或 Observable
```typescript
@Get()
async findAll(): Promise<Cat[]> {
  return await this.catsService.findAll();
}
```

## 请求生命周期
1. 中间件
2. 守卫
3. 拦截器（请求前）
4. 管道
5. 控制器处理
6. 拦截器（响应前）
7. 异常过滤器（如果有异常）

## 最佳实践
1. 控制器职责单一
   - 只负责处理 HTTP 请求和响应
   - 业务逻辑委托给服务处理

2. 使用 DTO
   - 定义请求数据的结构
   - 便于数据验证和类型检查

3. 统一响应格式
   - 使用统一的响应结构
   - 包含状态码、消息和数据

4. 错误处理
   - 使用异常过滤器统一处理错误
   - 返回合适的 HTTP 状态码

## 示例代码
```typescript
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities) {
    return await this.catsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return await this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.catsService.remove(id);
  }
}
```

## 调试信息
```
[Nest] 21988  - 2025/01/07 09:41:22     LOG [NestFactory] Starting Nest application...
[Nest] 21988  - 2025/01/07 09:41:22     LOG [InstanceLoader] AppModule dependencies initialized

[Nest] 21988  - 2025/01/07 09:41:22     LOG [RoutesResolver] AppController {/}
[Nest] 21988  - 2025/01/07 09:41:22     LOG [RouterExplorer] Mapped {/, GET} route
[Nest] 21988  - 2025/01/07 09:41:22     LOG [NestApplication] Nest application successfully started

@nestjs/core 是 NestJS 的核心库，提供了创建和管理 NestJS 应用程序的必要功能。
@nestjs/common 是 NestJS 的常用功能库，提供了常用的装饰器、中间件、管道等。
