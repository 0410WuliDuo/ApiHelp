---
title: HTTP缓存机制
date: 2023-3-28
author: 吴立铎
categories:
- Http
tags:
 - Http
isTimeLine: true
sidebar: false
isComment: false
---
## HTTP

### **HTTP服务过程**

(TCP是比HTTP更底层的一个连接协议 ，IP是TCP下面一层)

1.在地址栏输入网址 会对网址进行DNS域名解析，得到对应的IP地址

2.根据这个IP 找到对应的服务器，发起TCP的三次握手

3.建立TCP连接后发起HTTP请求

4.服务器详情HTTP请求，浏览器得到html代码

5.浏览器解析html代码,并请求html中的资源(css,img,js)

6.浏览器对页面进行渲染

7.服务器关闭TCP连接

## HTTP和HTTPS

- HTTP的URL由`http://`起始且默认使用端口80，而HTTPS的URL由`https://`起始且默认使用端口443
- HTTP是超文本传输协议，信息是明文传输，HTTPS则是具有安全性的 SSL 加密传输协议
- HTTP的连接很简单，是无状态的，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全



### **渲染过程**

- 构建DOM树（parse）：渲染引擎解析HTML文档，首先将标签转换成DOM树中的DOM node
- 构建渲染树（construct）：解析对应的CSS样式文件信息
- 布局渲染树（reflow/layout）：从根节点递归调用，计算每一个元素的大小、位置等，给出每个节点所应该在屏幕上出现的精确坐标
- 绘制渲染树（paint/repaint）：遍历渲染树，使用UI后端层来绘制每个节点。

浏览器得到html代码之后 

html生成dom树，css生成渲染树，得到html渲染树，计算元素的维持和尺寸 进行重排(回流)重绘 ，最后渲染呈现界面

### **http缓存**

能够提高服务器的并发性能 很多资源不需要重复请求回去 可以直接从个浏览器中拿缓存

http缓存分为 强缓存和协商缓存

强缓存 通过expoires和 cache-control控制 协商缓存 通过last-Modify 和 E-tag控制

因为expires 有个服务器和浏览器时间不同步的为

expires是绝对时间 cache-control 是相对时间

last-modify 有精度问题 到秒

e-tag 没有精度问题 只要文件改变 e-tag值就改变

### 常用的HTTP状态码

- **1xx表示客户端应该继续发送请求**

  **2xx表示成功的请求**

  - 200表示OK，正常返回信息
  - 201表示请求成功且服务器创建了新的资源
  - 202表示服务器已经接受了请求，但还未处理

  **3xx表示重定向**

  - 301表示永久重定向，请求的网页已经永久移动到新位置
  - 302表示临时重定向
  - 304表示自从上一次请求以来，页面的内容没有改变过

  **4xx表示客户端错误**

  - 401表示服务器无法理解请求的格式
  - 402表示请求未授权
  - 403表示禁止访问
  - 404表示请求的资源不存在，一般是路径写错了

  **5xx表示服务器错误**

  - 500表示最常见的服务器错误
  - 503表示服务器暂时无法处理请求

## fetch和axios

### **fetch和axios？ 区别和优缺点**

fetch 是浏览器底层提供的api 由WHATWG(苹果，微软，谷歌，火狐)  

axios是社区第三方封装的一个框架

fetch优点：

1.浏览器级别原生支持的api

2.原生支持promise api

3.语法简洁 符合es标准规范

4.由whatWG阻止提出  现在已经是W3C规范

缺点：
1.只针对网络请求报错, 对400,500错误码会当做成功, 并不会reject

2.默认不带cookie ，需要添加配置项 fetch(url,(key:value))

3.支不支持abort 不支持超时控制

4.不支持文件上传进度检测

axios是一个基于Promise用户浏览器和nodejs的HTTP客户端，本质上也是对原生XHR的封装，只不过它是Promise的显示版本，符合最新的ES规范

优点(特点)：

1.从浏览器创建XMLHttpRequest对象去实现请求

2.支持Promise api   promise.all() 支持并发请求

3.支持 从 node.js 创建 http 请求 

4.请求和响应拦截器

5.自动转换请求数据和响应数据

6.可以中断取消请求

7.客户端支持防御 CSRF(安全)

### **XSS CSRF**

XSS:指跨站脚本攻击

浏览器向服务器请求的时候被注入脚本攻击 （黑客会攻击你的浏览器 篡改浏览器的正常显示 窃取用户信息）

类型：反射型(非持久型)  存储型(持久型)  基于DOM

防范XSS 1.输入过滤 2.输出转义 3.使用HttpOnly请求头 锁死cookie

CSRF:跨站请求伪造 

黑客通过网站B 诱使用户去访问已经登录的网站A，进行一些违背用户医院的请求 造成用户的损失

防范CSRF  主要是在服务器端做的

1.服务器中验证请求头 refer字段 （多次跳转失效）
2.加token	 ( 主流方法 )
3.加验证码 ( 成本较高 )

**Vuex**

1.修改state逻辑流程：dispath 触发 action -> commit触发mutation -> 在mutation修改全局数据

2.可以跳过action 直接触发mutation

this.$store.commit('mutation函数xx')

获取使用: this.$store.state.xxx

什么时候可以跳过？没有异步操作的时候（ajax都是异步操作）

actions => 负责获取 处理数据( 如果有异步操作 必须在action中给处理 再到mutation)，提交到mutation进行更新

```js
state:{
    //放置全局数据
    xxx:xxx
}
mutations:{
    xxx(state,传入的修改数据){
        //在这里修改state
    }
}
action:{
    //action对应的函数
    xxx(obj){
        //obj对象里有commit
        obj.commit('mutation里的函数xx')
    }

}
modules:{
   // 模块：{ 一套state action mutation }
}
```

modules 在store全局数据 是可以分模块管理的

它可以区分每个不同模块的数据

...mapMutations(模块名,['xxx'])

**Vue data为什么写成函数**

对象是复杂类型 这样写 导入组件会引起冲突

函数写法 每次都return新对象 互不影响

**跨域**

域名 协议 ip地址 端口 任何一个不一样就跨域

解决

1. jsonp --使用script的src发送

2. cors 后台设置允许跨域 需要后台设置 允许跨域

3. 服务器代理（反向代理）

   a前端 发送给 a后台 ---> 发送给b后台

   成功之后 数据原路返回 这就是服务器代理

   重点  现在 前端vue框架是可以自己设置服务器代理的 proxy

   vue.config.js 可以配置webpack

   相当于是vue脚手架帮你开启了一个隐藏的服务器 进行反向代理

## **Promise**

promise 是javascript的异步操作的解决方案，为一步操作统一接口，它起到代理的作用，充当异步操作与回调之间的中介，使得异步操作写起来，就像在写同步操作的流程一样，而不必一层层的嵌套回调函数

promise实例具有有三种状态

pending(等待) fulfiled(成功) rejected(失败)

这三种的状态的变化途径只有两种。

- 异步操作成功，Promise 实例传回一个值（value），状态变为`fulfilled`。
- 异步操作失败，Promise 实例抛出一个错误（error），状态变为`rejected`

Promise 实例的状态变化只可能发生一次，状态一旦改变就不会在变，创造promise实例后会立即执行

为什么会有promise?

1.解决回调地狱，代码难以维护，第一个函数的输出是第二个函数输入的对象

2.支持多个并发的请求

3.可以解决异步的问题，但是并不能说promise是异步的

Promise对象用于表示一个异步操作的最终完成(或失败)，及其结果值

缺点：

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

先执行同步任务（new Promise前半段同步执行）  异步操作会进入事件队列   先微后宏任务

微任务( promise,then )

宏任务( 定时器 延时器  )

## **async await**

其实就是Generator的语法糖

function *  xxx{

  yield 'aa' //  yield相当于暂停标记

}

xx.next() 拿到这个暂停的值，如果继续next 执行下一个yield节点

# JS

## 数据类型

JS有7中数据类型

- Number
- String
- Boolean
- Null
- Undefined
- Symbol(ES6新定义)
- Object

前面六种为基本类型 ES6出现的Symbol也是原始类型数据，表示是数据独一无二

Object为引用类型(范围较大)包括数组、函数。

## == 和 === 的区别

对象 == 字符串 会进行隐式转换  对象.toString() 变为字符串

特殊情况：

1. null == undefined  结果为 true 但是他们和其他值比较就不再相等了
2. NaN == NaN 不相等

剩下的都是转换为数组

## 闭包

忍者秘籍里的定义：**闭包是一个函数在创建时允许该自身函数访问并操作该自身函数之外的变量时所创建的作用域**。

更清晰的版本是：**闭包可以让一个函数访问并操作其声明时的作用域中的变量和函数，并且，即使声明时的作用域消失了，也可以调用**。

要注意的是：闭包不是在创建的那一时刻点的状态的快照，而是一个真实的封装，只要闭包存在，就可以对其进行修改。

## 深浅克隆(拷贝)

深克隆 JSON.parse(JSON.stringify( obj ))   有弊端 不能拷贝 函数,正则和Date类型

```js
function deepClone( obj ){
    // 过滤特殊情况
    if(obj === null) return null
    if(typeof obj!== "object") return obj
    if(obj instanceof EegExp){
        return new RegExp(obj)
    }
     if(obj instanceof Date){
        return new Date(obj)
    }

	let newObj = new obj.constructor

	for( let key in obj ){

		if( obj.hasOwnProperty(key) ){

			newObj [key] = obj [key]

		}

	}
    return newObj

}
```

## cookie,sessionStorage和localStorage

- `cookie`用来保存登录信息，大小限制为`4KB`左右
- `localStorage`是H5新增的，用于本地数据存储，保存的数据没有过期时间，一般浏览器大小限制在`5MB`，只能手动清除
- `sessionStorage`接口方法和localStorage类似，但保存的数据的只会在当前会话中保存下来，页面关闭或者关闭浏览器后会被清除

























## 性能优化

## 模块化

模块化主要是用来抽离公用代码，隔离作用域，避免变量冲突







## 介绍

我叫 lmy  毕业于燕京理工学院 专业是计算机应用技术，19年毕业入职华通科技，截止到现在一直在从事前端开发岗位的工作，开发经验有一年半，在公司能够根据产品和项目需求和IU原型图完成页面编写，和后端工程师调试接口。刚入职公司主要做的是一些JSP项目，现在外面的公司JSP的项目应该用的很少了几乎咩有，现在开发大都是前后端分离，当时主要 用的技术栈是JQ+Layui,主要的项目类型都是后台管理系统。最近的项目都是使用Vue+ElementUI, 现在已经进入项目收尾的是一套OA系统，细致的话是分为两个系统，一类是员工提单的财务系统，里面包含财务和普通员工提单预算和报销使用，在这个财务系统里，分为三个模块 ，流程互相对应，还有一套是类似后台管理，这个里面主要是管理员进行配置和一些财务有权限访问部分页面，管理员进行配置审批的流程，在里面可以根据团队或者是部门动态设置审批人。这个系统主要是作为财务或者出纳进行同时使用，里面包含打印功能，在企业微信内调用不了系统的打印，所有都做成了下载后打印。也做过react项目，

