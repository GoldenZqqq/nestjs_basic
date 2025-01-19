# NestJS 装饰器实践

## 项目简介
本项目展示了 NestJS 中各种装饰器的实际应用场景和最佳实践。通过实际示例展示如何使用和组合各种装饰器来增强应用程序的功能。

## 示例文件说明

### 1. 类和方法装饰器 (1.class_method_decorator.ts)
- 展示了类装饰器和方法装饰器的组合使用
- 包含了装饰器的编译输出结果 (1.class_method_decorator.js)
- 演示了如何：
  - 使用类装饰器添加元数据
  - 使用方法装饰器增强方法功能
  - 装饰器之间的交互方式

### 2. 类访问器装饰器 (2.class_accessor_decorator.ts)
- 展示了访问器（getter/setter）装饰器的使用
- 包含了装饰器的编译输出结果 (2.class_accessor_decorator.js)
- 演示了如何：
  - 装饰 getter/setter 方法
  - 控制属性的访问权限
  - 添加访问日志或验证

## 项目配置

### TypeScript 配置 (tsconfig.json)
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,     // 启用装饰器
    "emitDecoratorMetadata": true,      // 启用装饰器元数据
    "target": "ES2020",                 // 目标 ECMAScript 版本
    "module": "CommonJS"                // 模块系统
  }
}
```

### 依赖说明 (package.json)
- typescript: TypeScript 编译器
- @types/node: Node.js 类型定义
- ts-node: 用于直接运行 TypeScript 文件
- reflect-metadata: 用于实现元数据反射

## 装饰器使用指南

### 1. 类装饰器
```typescript
function Controller(path: string) {
  return function (target: Function) {
    // 为类添加元数据
    Reflect.defineMetadata('path', path, target);
  };
}
```

### 2. 方法装饰器
```typescript
function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 增强方法功能
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // 添加前置处理
      const result = originalMethod.apply(this, args);
      // 添加后置处理
      return result;
    };
  };
}
```

### 3. 访问器装饰器
```typescript
function ValidateProperty() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 增强 getter/setter
    const originalGet = descriptor.get;
    const originalSet = descriptor.set;
    
    descriptor.get = function () {
      return originalGet?.call(this);
    };
    
    descriptor.set = function (value: any) {
      originalSet?.call(this, value);
    };
  };
}
```

## 最佳实践

### 1. 装饰器组合
- 合理组合多个装饰器
- 注意装饰器的执行顺序
- 避免装饰器之间的循环依赖

### 2. 性能优化
- 避免在装饰器中进行耗时操作
- 合理使用元数据缓存
- 减少不必要的反射操作

### 3. 类型安全
- 使用 TypeScript 的类型系统
- 避免使用 any 类型
- 为装饰器参数提供类型定义

## 运行示例

```bash
# 安装依赖
pnpm install

# 运行类和方法装饰器示例
ts-node 1.class_method_decorator.ts

# 运行访问器装饰器示例
ts-node 2.class_accessor_decorator.ts
```

## 调试技巧
1. 使用 console.log 输出装饰器执行过程
2. 查看编译后的 JavaScript 代码
3. 使用 VSCode 的调试功能
4. 观察元数据的变化

## 注意事项
1. 确保 TypeScript 配置正确
2. 注意装饰器的执行顺序
3. 小心处理装饰器中的 this 上下文
4. 避免在装饰器中修改原型链

## 后续功能规划

### 1. 参数装饰器示例
- `3.parameter_decorator_validation.ts`: 参数验证装饰器
- `4.parameter_decorator_transform.ts`: 参数转换装饰器
- `5.parameter_decorator_inject.ts`: 依赖注入参数装饰器

### 2. 属性装饰器示例
- `6.property_decorator_validation.ts`: 属性验证装饰器
- `7.property_decorator_format.ts`: 属性格式化装饰器
- `8.property_decorator_serialize.ts`: 属性序列化装饰器

### 3. 高级装饰器示例
- `9.composite_decorators.ts`: 组合装饰器模式
- `10.factory_decorators.ts`: 装饰器工厂模式
- `11.async_decorators.ts`: 异步装饰器实现

### 4. 实用装饰器集合
- `12.cache_decorator.ts`: 缓存装饰器
- `13.retry_decorator.ts`: 重试机制装饰器
- `14.timeout_decorator.ts`: 超时控制装饰器
- `15.log_decorator.ts`: 日志记录装饰器

### 5. 安全相关装饰器
- `16.auth_decorator.ts`: 身份认证装饰器
- `17.role_decorator.ts`: 角色权限装饰器
- `18.rate_limit_decorator.ts`: 访问频率限制装饰器

### 6. 数据处理装饰器
- `19.validation_pipe_decorator.ts`: 数据验证管道装饰器
- `20.transform_pipe_decorator.ts`: 数据转换管道装饰器
- `21.serialization_decorator.ts`: 数据序列化装饰器

## 贡献指南
欢迎提交 Issue 和 Pull Request 来完善这个项目。在提交代码时，请确保：
1. 遵循项目的代码风格
2. 添加适当的测试用例
3. 更新相关文档
4. 提供清晰的提交信息 