// 还可以替换类的构造函数
// 通过返回一个新的构造函数来替换原有的构造函数
function replaceConstructor<T extends new (...args: any[]) => {}>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args) {
      super(...args)
      console.log("instance created")
    }
  }
}
@replaceConstructor
class User {
  constructor(public name: string) {
    console.log("User craeted")
  }
}
const doc = new User("Alice")
console.log(doc.name)

export {}
