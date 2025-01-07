import "reflect-metadata"

interface ControllerOptions {
  prefix?: string
}
// 其实可以给Controller传递路径前缀
// 路径前缀可以为空，也可以写成空字符串，也可以写一个非空字符串，也可以写成一个对象
export function Controller(): ClassDecorator // 传入空
export function Controller(prefix: string): ClassDecorator // 传入字符串
export function Controller(options: ControllerOptions): ClassDecorator // 传入对象
export function Controller(
  prefixOrOptions?: string | ControllerOptions
): ClassDecorator {
  let options: ControllerOptions = {}
  if (typeof prefixOrOptions === "string") {
    options.prefix = prefixOrOptions
  } else if (typeof prefixOrOptions === "object") {
    options = prefixOrOptions
  }
  // 这是一个类装饰器
  return (target: Function) => {
    // 给控制器类增加prefix路径前缀的元数据
    Reflect.defineMetadata("prefix", options.prefix || "", target)
  }
}
