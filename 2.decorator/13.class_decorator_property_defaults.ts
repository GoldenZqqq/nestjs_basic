function defaultValue(defaults: { [key: string]: any }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        Object.keys(defaults).forEach(key => {
          if (this[key] === undefined) {
            this[key] = defaults[key]
          }
        })
      }
    }
  }
}
@defaultValue({
  theme: "dark"
})
class Settings {
  theme: string
}
const settings = new Settings()
console.log(Object.getOwnPropertyDescriptor(settings, "theme"))
// console.log(Object.getOwnPropertyDescriptor(Settings.prototype, "theme"))

export {}
