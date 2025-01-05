# NestJS 入门示例

本示例展示了 NestJS 的基础用法和核心概念。

## 项目结构说明

```
src/
  ├── app.controller.ts    # 基础控制器示例
  ├── app.service.ts       # 基础服务示例
  ├── app.module.ts        # 根模块配置
  └── main.ts             # 应用程序入口文件
```

## 核心概念讲解

### 1. 控制器 (Controller)
- 负责处理传入的请求和返回响应
- 使用装饰器定义路由和请求方法
- 示例：
```typescript
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### 2. 服务 (Service)
- 封装业务逻辑
- 可通过依赖注入在不同组件间共享
- 示例：
```typescript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### 3. 模块 (Module)
- 组织应用程序结构的基本单位
- 将相关的控制器和服务组合在一起
- 示例：
```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 依赖注入示例
- 通过构造函数注入服务
- 使用 @Injectable() 装饰器标记服务
- 在模块中注册提供者

## HTTP 请求处理
- @Get()、@Post()、@Put()、@Delete() 等请求方法装饰器
- 请求参数获取：@Param()、@Query()、@Body()
- 响应处理：状态码、响应头、响应体

## 开发调试

### 安装依赖
```bash
pnpm install
```

### 运行项目
```bash
# 开发模式
pnpm start:dev

# 生产模式
pnpm start:prod
```

### 测试命令
```bash
# 单元测试
pnpm test

# e2e 测试
pnpm test:e2e
```

## 常见问题解答

### 1. 启动失败
- 检查端口是否被占用
- 确认依赖是否安装完整
- 检查 TypeScript 配置

### 2. 装饰器不生效
- 确认 tsconfig.json 中启用了装饰器
- 检查是否正确导入了装饰器

### 3. 依赖注入失败
- 检查服务是否使用 @Injectable() 装饰
- 确认服务是否在模块中注册

## 最佳实践建议
1. 保持控制器简洁，业务逻辑放在服务中
2. 使用 DTO 对象进行数据传输
3. 适当使用异步/等待处理异步操作
4. 遵循 SOLID 原则进行代码组织

## 下一步学习建议
1. 了解中间件的使用
2. 学习异常过滤器
3. 掌握管道验证
4. 探索守卫和拦截器

## 参考资源
- [NestJS 官方文档](https://docs.nestjs.com/)
- [NestJS GitHub 仓库](https://github.com/nestjs/nest)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
