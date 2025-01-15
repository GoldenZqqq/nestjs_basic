## 如何使用stage3的装饰器写法
- TypeScript5.x 就是stage3的新写法了
- 设置"experimentalDecorators": false   "emitDecoratorMetadata": false

## 1.intelliSense
- 这个指的是智能代码补全的功能
- vscode还可以进行错误检查 

## 2.tsServer
- vscode 内部使用 tsServer 服务器进行代码检查
- tsServer 只是一个服务，内部会调用 Tsdk 进行检查
- Tsdk 版本是可以切换的