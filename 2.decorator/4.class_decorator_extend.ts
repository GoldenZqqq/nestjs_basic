// 类装饰器扩展类的功能，比如可以添加新的属性和方法
function addTimestamp<T extends new (...args: any[]) => {}>(constructor: T) {
  return class extends constructor {
    timestamp = new Date()
  }
}
interface Document {
  timestamp: Date
}
@addTimestamp
class Document {
  constructor(public title: string) {}
}
const doc = new Document("My Document")
console.log(doc.title)
console.log(doc.timestamp)

export {}
