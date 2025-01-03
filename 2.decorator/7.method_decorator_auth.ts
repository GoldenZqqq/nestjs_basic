// 可以在方法调用前检查用户的权限，决定是否可以调用
let users = {
  "001": { roles: ["admin"] },
  "002": { roles: ["member"] }
}
function authorize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    let user = users[args[0]]
    if (!user) {
      throw new Error("User not found")
    }
    if (!user.roles.includes("admin")) {
      throw new Error("Unauthorized")
    }
    return originMethod.apply(this, args)
  }
  return descriptor
}

class AdminPanel {
  @authorize
  deleteUser(userId: string) {
    console.log(`Deleting user with ID: ${userId}`)
  }
}

const adminPanel = new AdminPanel()
adminPanel.deleteUser("002")
