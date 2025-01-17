# TypeScript Stage3 装饰器详解

## Stage3 装饰器简介
- Stage3 装饰器是 ECMAScript 的新提案
- TypeScript 5.x 已经实现了这个提案的语法
- 相比旧版装饰器有更好的类型推导和性能

## 配置要求
1. TypeScript 配置
   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": false,   // 关闭旧版装饰器
       "emitDecoratorMetadata": false,    // 关闭装饰器元数据
       "target": "ES2022"                 // 目标版本需要 ES2022 或更高
     }
   }
   ```

2. 开发工具要求
   - VSCode 需要使用最新版本
   - TypeScript 版本需要 5.0 或更高

## Stage3 装饰器新特性

### 1. 新的语法结构
- 装饰器表达式现在是从左到右求值
- 装饰器函数接收明确的上下文对象
- 支持访问和修改私有属性
```typescript
@decorator
class Example {
  @decorator
  method() {}
}
```

### 2. 类装饰器
- 接收 ClassDecoratorContext 上下文对象
- 可以访问类的元数据
```typescript
function classDecorator(target: Class, context: ClassDecoratorContext) {
  // 新的装饰器实现
}
```

### 3. 方法装饰器
- 接收 MethodDecoratorContext 上下文对象
- 可以修改方法的实现
```typescript
function methodDecorator(target: Method, context: MethodDecoratorContext) {
  // 新的方法装饰器实现
}
```

### 4. 属性装饰器
- 接收 PropertyDecoratorContext 上下文对象
- 支持计算属性名
```typescript
function propertyDecorator(target: Property, context: PropertyDecoratorContext) {
  // 新的属性装饰器实现
}
```

## IDE 支持

### 1. IntelliSense 支持
- 提供更准确的代码补全
- 支持装饰器参数类型推导
- 更好的错误提示和类型检查
- 悬停提示显示详细的类型信息

### 2. TSServer 支持
- VSCode 内置的 TypeScript 服务器
- 提供实时的语法检查
- 支持代码导航和重构
- 可以切换不同版本的 TypeScript SDK

## 与旧版装饰器的区别

### 1. 执行顺序
- 旧版：从内到外，从右到左
- Stage3：从外到内，从左到右

### 2. 上下文对象
- 旧版：参数不统一，类型信息有限
- Stage3：统一的上下文对象，包含更多元数据

### 3. 类型系统
- 旧版：类型推导有限
- Stage3：完整的类型推导支持

### 4. 性能优化
- 更高效的运行时性能
- 更好的树摇（tree-shaking）支持
- 更小的编译输出

## 最佳实践

### 1. 类型安全
- 使用 TypeScript 的类型系统
- 避免使用 any 类型
- 利用上下文对象提供的类型信息

### 2. 性能考虑
- 避免在装饰器中进行耗时操作
- 合理使用元数据
- 注意内存使用

### 3. 代码组织
- 按功能分组装饰器
- 使用命名约定
- 提供清晰的文档

## 调试技巧
1. 使用 VSCode 的调试工具
2. 利用 TSServer 的错误提示
3. 查看编译后的代码
4. 使用 console.log 输出上下文信息

## 注意事项
1. 确保项目依赖的其他库兼容 Stage3 装饰器
2. 注意与旧版装饰器的代码混用问题
3. 关注 TypeScript 版本更新
4. 定期更新开发工具