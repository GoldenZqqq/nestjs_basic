import "reflect-metadata"

function log(value, context) {
  console.log("value", value)
  console.log("context", context)
}

@log
class Person {
  // @Reflect.metadata("metadataKey","metadataValue")
  getName() {

  }


}
