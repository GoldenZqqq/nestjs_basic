// 属性访问控制
// 还可以实现属性装饰器来进行访问控制 或者设置初始值

function defaultValue(value: any) {
  return function (target: any, propertyKey: string) {
    let val = value
    const get = function () {
      return val
    }
    const set = function (newVal: any) {
      val = newVal
    }
    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get,
      set
    })
  }
}

class Settings {
  @defaultValue("dark")
  theme: string
  @defaultValue(30)
  timeout: number
}

const settings = new Settings()
console.log(settings.theme)
console.log(settings.timeout)
