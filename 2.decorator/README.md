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

### 方法装饰器
- 应用于类的方法上
- 可以用来监视、修改或者替换方法定义
- 接收三个参数：目标对象、方法名、属性描述符

### 属性装饰器
- 应用于类的属性上
- 用于监视类的属性
- 接收两个参数：目标对象和属性名

### 参数装饰器
- 应用于方法的参数上
- 可以用来获取和验证方法参数
- 接收三个参数：目标对象、方法名、参数索引

### 访问符装饰器
- 应用于访问器的属性描述符
- 可以用来监视、修改或替换访问器的定义
- 接收三个参数：目标对象、成员名、属性描述符

## 使用注意事项
- 装饰器执行顺序：参数装饰器 -> 方法装饰器 -> 属性装饰器 -> 类装饰器
- TypeScript中需要在tsconfig.json中启用experimentalDecorators选项
- 装饰器不能用在声明文件(.d.ts)中
- 同一个目标可以使用多个装饰器

