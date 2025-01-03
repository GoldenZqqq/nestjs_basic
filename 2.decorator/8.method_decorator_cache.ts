// 方法装饰器可以实现缓存结果
function cache(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originMethod = descriptor.value
  const cacheMap = new Map<string, any>()
  descriptor.value = function (...args: any[]) {
    const cacheKey = JSON.stringify(args)
    if (cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey)
    }
    const result = originMethod.apply(this, args)
    console.log(`originalMethod: ${args}`)
    cacheMap.set(cacheKey, result)
    return result
  }
  return descriptor
}
class MathOperations {
  @cache
  factorial(n: number): number {
    if (n <= 1) return 1
    return n * this.factorial(n - 1)
  }
}
const mathOperations = new MathOperations()
console.log(mathOperations.factorial(5))
console.log(mathOperations.factorial(5))
