interface Obj {
  a: number
  b: number
}

const obj = { a: 1, b: 2 }
console.log(Reflect.get(obj, "a"))
Reflect.set(obj, "b", 2)
console.log(obj.b)
