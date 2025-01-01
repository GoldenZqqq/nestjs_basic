# NestJS 基础项目

## 项目简介
这是一个基于 NestJS 框架的基础项目。NestJS 是一个用于构建高效、可靠和可扩展的服务器端应用程序的渐进式 Node.js 框架。

## NestJS 主要特性

### 1. 架构模式
- 基于 TypeScript 构建
- 采用面向对象编程（OOP）
- 函数式编程（FP）
- 函数响应式编程（FRP）
- 模块化架构设计

### 2. 核心功能
- **依赖注入系统**：强大的依赖注入容器，提高代码的可测试性和可维护性
- **模块化设计**：使用装饰器来组织代码，便于管理和扩展
- **中间件支持**：支持全局、模块级和路由级中间件
- **异常过滤器**：统一的异常处理机制
- **管道验证**：内置数据验证和转换功能
- **守卫机制**：用于身份验证和授权
- **拦截器**：用于在函数执行前后添加额外的逻辑

### 3. 数据库支持
- 支持多种数据库（MySQL, PostgreSQL, MongoDB 等）
- TypeORM 集成
- Mongoose 集成

### 4. WebSocket 支持
- 内置 WebSocket 支持
- 实时通信能力
- Gateway 装饰器

## 快速开始

### 安装
```bash
npm install -g @nestjs/cli
nest new project-name
```

### 项目结构
```
src/
  ├── app.controller.ts    # 基础控制器
  ├── app.service.ts       # 基础服务
  ├── app.module.ts        # 根模块
  └── main.ts             # 应用程序入口文件
```

### 开发命令
```bash
# 开发模式运行
npm run start:dev

# 构建项目
npm run build

# 生产模式运行
npm run start:prod

# 运行测试
npm run test
```

## 主要概念

### 1. 控制器（Controllers）
控制器负责处理传入的请求和向客户端返回响应。

```typescript
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

### 2. 提供者（Providers）
提供者是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为提供者 - services, repositories, factories, helpers 等。

```typescript
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }
}
```

### 3. 模块（Modules）
模块是用 @Module() 装饰器注释的类。每个应用程序至少有一个根模块。

```typescript
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

## 最佳实践
- 使用 TypeScript 装饰器
- 遵循依赖注入原则
- 使用异步/等待模式
- 实现适当的错误处理
- 使用 DTO（数据传输对象）
- 实现数据验证
- 使用环境变量配置

## 调试与测试
- 支持 Jest 测试框架
- E2E 测试支持
- 详细的日志记录
- 开发者工具集成

## 文档
更多详细信息，请参考 [NestJS 官方文档](https://docs.nestjs.com/)。

## 许可证
[MIT licensed](LICENSE) 