import {
  Controller,
  Get,
  Post,
  Redirect,
  HttpCode,
  Header,
  Req,
  Request,
  Query,
  Headers,
  Session,
  Ip,
  Param,
  Body,
  Response,
  Next
} from "@nestjs/common"
import { Request as ExpressRequest, Response as ExpressResponse } from "express"

@Controller("users")
export class UserController {
  @Get("req")
  handleRequest(
    @Req() req: ExpressRequest,
    age: number,
    @Request() request: ExpressRequest
  ) {
    console.log("url", req.url)
    console.log("age", age)
    console.log("method", request.method)
    return "handleRequest"
  }

  @Get("query")
  handleQuery(@Query() query: any, @Query("id") id: string) {
    console.log("query", query)
    console.log("id", id)
    return `query id: ${id}`
  }

  @Get("headers")
  handleHeaders(@Headers() headers: any, @Headers("accept") accept: string) {
    console.log("headers", headers)
    console.log("accept", accept)
    return `accept: ${accept}`
  }

  @Get("session")
  handleSession(
    @Session() session: any,
    @Session("pageView") pageView: string
  ) {
    console.log("session", session)
    console.log("pageView", pageView)
    if (session.pageView) {
      session.pageView++
    } else {
      session.pageView = 1
    }
    return `pageView: ${session.pageView}`
  }

  @Get("ip")
  getUserIp(@Ip() ip: string) {
    console.log("ip", ip)
    return `ip: ${ip}`
  }

  @Get(":username/info/:age")
  getUserNameInfo(
    @Param() params,
    @Param("username") username: string,
    @Param("age") age: string
  ) {
    console.log("params", params)
    console.log("username", username)
    console.log("age", age)
    return `age: ${age}`
  }

  @Get("star/ab*de")
  handleWildcard() {
    return `handleWildcard`
  }

  @Post("create")
  @HttpCode(200)
  @Header("Cache-Control", "none") // 向客户端发送一个响应头
  @Header("Content-Type", "application/json") // 向客户端发送一个响应头
  createUser(@Body() createUserDto, @Body("username") username: string) {
    console.log(`createUserDto: ${createUserDto}`)
    console.log(`username: ${username}`)
    return `user created`
  }

  @Get("response")
  response(@Response() response: ExpressResponse) {
    console.log("response", response)
    response.send("send")
    // response.json({ success: true })
    return `response`
  }

  @Get("passthrough")
  passthrough(@Response({ passthrough: true }) response: ExpressResponse) {
    // 使用passthrough装饰器，则不会返回响应，只添加响应头
    response.setHeader("key", "value")
    // response.send("send")
    // response.json({ success: true })
    // 还是想返回一个值让Nest帮我们进行发送响应体操作
    return `response`
  }

  @Get("next")
  next(@Next() next) {
    console.log("next")
    next()
  }

  @Get("/redirect")
  @Redirect("/users/req", 301)
  handleRedirect() {}

  @Get("/redirect2")
  handleRedirect2(@Query("version") version) {
    return { url: `https://docs.nestjs.com/${version}/`, statusCode: 301 }
  }
}
/**
 * 在使用Nest.js的时候，一般来说一个实体会定义两个类型，一个是dto，一个是interface
 * dto 客户端向服务器提交的数据对象，比如说当用户注册的时候 { 用户名， 密码 }
 * interface是接口类型，用于描述对象的结构，一般用于返回值
 */
