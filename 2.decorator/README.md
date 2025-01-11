## Reflect 
- Reflect 是ES6新引入的一个内置对象，它提供一些反射方法
- 其实以前这些方法都分散在Object或Function上
- 常用的Reflect方法包括：
  - Reflect.get(target, propertyKey): 获取对象的属性值
  - Reflect.set(target, propertyKey, value): 设置对象的属性值
  - Reflect.has(target, propertyKey): 判断对象是否有某个属性
  - Reflect.apply(target, thisArg, args): 调用一个函数
  - Reflect.construct(target, args): 对构造函数进行 new 操作

## reflect-metadata
- reflect-metadata 是一个用于TS和ECMA的元数据反射库提案
- 它通过提供对元数据定义和检查的支持，简化了装饰器的使用
- 可以在类、方法、参数、属性上设置和获取元数据
- 主要API：
  - Reflect.defineMetadata(metadataKey, metadataValue, target): 定义元数据
  - Reflect.getMetadata(metadataKey, target): 获取元数据
  - Reflect.hasMetadata(metadataKey, target): 检查是否存在元数据

## 装饰器
- 装饰器是一种特殊的声明，可以附加到类、方法、访问符、属性上面，可以修改行为
- 装饰器本质上是一个函数，在运行时被调用

### 类装饰器
- 应用于类构造函数，用于监视、修改或替换类定义
- 接收类的构造函数作为参数
- 可以用来扩展类的属性和方法
- 示例文件：
  - `3.class_decorator_basic.ts`: 基础类装饰器示例
  - `4.class_decorator_extend.ts`: 扩展类的属性和方法
  - `5.class_decorator_constructor.ts`: 修改类的构造函数
  - `13.class_decorator_property_defaults.ts`: 设置类属性默认值

### 方法装饰器
- 应用于类的方法上
- 可以用来监视、修改或者替换方法定义
- 接收三个参数：目标对象、方法名、属性描述符
- 示例文件：
  - `6.method_decorator_logging.ts`: 方法调用日志记录
  - `7.method_decorator_auth.ts`: 方法级别的权限验证
  - `8.method_decorator_cache.ts`: 方法结果缓存

### 属性装饰器
- 应用于类的属性上
- 用于监视类的属性
- 接收两个参数：目标对象和属性名
- 示例文件：
  - `9.property_decorator_validation.ts`: 属性验证
  - `10.property_decorator_default_value.ts`: 设置属性默认值

### 参数装饰器
- 应用于方法的参数上
- 可以用来获取和验证方法参数
- 接收三个参数：目标对象、方法名、参数索引
- 示例文件：
  - `11.parameter_decorator_validation.ts`: 参数验证示例

## 基础示例
- `1.basic_reflect_get_set.ts`: Reflect 基本操作示例
- `2.reflect_metadata_usage.ts`: reflect-metadata 使用示例

## 高级示例
- `12.decorator_execution_order.ts`: 装饰器执行顺序演示

## 使用注意事项
- 装饰器执行顺序：参数装饰器 -> 方法装饰器 -> 属性装饰器 -> 类装饰器
- TypeScript中需要在tsconfig.json中启用experimentalDecorators选项
- 装饰器不能用在声明文件(.d.ts)中
- 同一个目标可以使用多个装饰器

## 运行示例
```bash
# 安装依赖
pnpm install

# 运行特定示例
ts-node [示例文件名].ts
```

## 推荐学习顺序
1. 从基础示例开始：`1.basic_reflect_get_set.ts` 和 `2.reflect_metadata_usage.ts`
2. 学习类装饰器：从 `3.class_decorator_basic.ts` 到 `5.class_decorator_constructor.ts`
3. 掌握方法装饰器：`6.method_decorator_logging.ts` 到 `8.method_decorator_cache.ts`
4. 了解属性和参数装饰器：`9.property_decorator_validation.ts` 到 `11.parameter_decorator_validation.ts`
5. 最后学习高级概念：`12.decorator_execution_order.ts` 和 `13.class_decorator_property_defaults.ts`

