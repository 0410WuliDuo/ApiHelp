---
title: MVVM_和MVC的区别
date: 2023-4-23
author: 吴立铎
categories:
- Vue
- WebPack
tags:
 - Vue
isTimeLine: true
sidebar: true
isComment: false
---

## MVVM？和MVC的区别

MVC  	M-数据模型，V-视图，C-控制器

MVC 的思想：一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来，换句话说就是在 Controller 里面把 Model 的数据赋值给 View。

MVVM  M-数据模型  V-视图，VM-视图模型

VM做了两件事达到了数据的双向绑定 

一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。

二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。

MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）



## Vue响应式原理

vue采用了Object.defineProperty方法对data里的属性进行数据劫持，利用发布订阅模式，在getter方法中进行订阅，在setter中进行发布。

在响应式系统中对data中的每个属性都新建一个订阅中心作为发布者，而监听器watch，计算属性computed，和template/render同时作为订阅者，对watch监听的数据会直接进行订阅，对computed和template模板渲染时候获取data中的数据，就会触发gette方法，然后自动进行订阅，修改属性的时候会触发setter方法，从而完成当前修改属性的发布通知，通知订阅者进行更新。

## 为什么data是一个函数

一个组件可能会在很多地方使用，是函数的话，就会创建很多个new vue实例，都有属于自己的data。如果是一个对象的话，对象是引用类型，在一个地方修改了data，那个引用这个地址的其他地方也会受到影响。所以必须是一个函数，互不影响。

## computed和watch

两个都可以监听data属性的变化从而做出响应。

计算属性computed具有一个缓存的功能，它可以将一个或者多个data中的数据进行计算并返回一个新值，给渲染函数使用，当它内部的依赖属性发生变化，不会去立即改变数据，而是先标记为脏数据，当下次computed被获取时候，才会进行重新计算并返回。项目中像是一些稍微复杂的逻辑判断都可以写在computed里，防止在html视图层内写过多的判断，便于维护。

监听器watch，并不具备缓存性，它会提供一个监听函数，如果数据有变化，就会立即执行该函数

区别：

- `computed`支持缓存，`watch`不支持缓存
- `computed`不支持异步，内部如果有异步操作无效，无法监听数据的变化，`watch`支持异步
- 如果一个属性由其他属性计算而来，这个属性依赖其他属性，是多对一或者一对一用`computed`，而当一个属性发生变化时需要进行的对应操作，属于一对多，使用`watch`

## Vue 生命周期

`beforeCreate`：是new Vue() 之后触发的第一个钩子函数，当前周期不可访问data,methods,computed,watch内的数据和方法。

`created`：在实例创建完成之后触发，当前阶段已经完成了数据观测，可以访问和修改数据，但是不会触发undated函数，当前阶段不可与DOM交互，如果非要，可以用$nextTick来访问DOM。

`beforeMounte`：挂载之前触发，当前阶段模板编译完成，虚拟DOM已经创建完成，即将开始渲染，此时也可以进行数据修改，不会触发undated函数

`mounted`：挂载完成之后触发，当前阶段真实DOM据挂载完成，数据完成双向绑定，可以获取DOM通过$refs进行操作，请求数据接口可以放到这个钩子函数内也可以放到created内

`beforeUpdate`：响应数据更新之前触发的钩子函数，当前阶段可以进行数据修改。

`updated`：响应数据更新完成之后触发，当前阶段DOM已经更新完成，避免在这个阶段修改数据，可能会陷入死循环更新。

`beforeDestroy`：发生在实例销毁前，当前阶段组件实例完全可以被使用，可以进行一些收尾工作，比方说清除定时器

`destroyed`：发生在实例销毁之后，当前阶段组件只剩下一个DOM空壳，组件已经被拆解，数据绑定和监听也已经移除，子组件实例也被销毁。

`actibated`：keep-alive 专属，组件被激活时调用

`deactivated`：keep-alive 专属，组件被销毁时调用

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面  loading 时间；
- ssr  不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 组件间通信

 父子组件间

父组件通过 v-bind(:) 属性 -- > 子组件 子组件在'props'内进行接收使用。

子-->父  `$emit` ('父组件中自定义事件'，需要传入的值)  通过调用父组件中`$on`绑定的方法去修改父组件内的数据

`$parent - $children`

嵌套层级比较深的组件的组件使用$attrs和$listeners

`$attrs - $listeners` 模式(a->b->c)传递组件组件的属性和方法，

在后代组件中用 `$attrs` 接收不含样式的属性用 `$listeners` 接收不包含.native的方法 

`inheritAttrs`默认为true，会将父组件中除了props外的属性添加早子元素的根节点上，未在组件内注册的属性都会在html上显示，为false则不显示。

兄弟组件通信原理还是 `$emit/$on`  这种方法会通过一个空的Vue实例作为事件总线，就像是所有组件共用相同的事件中心，用它来触发事件和监听事件

步骤：

1. 初始化 -- 创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.

```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

2. 发送事件 -- 比方说有一个兄弟组件

```vue
// addtionNum.vue 中发送事件
<template>
  <div>
    <button @click="additionHandle">+加法器</button>    
  </div>
</template>

<script>
import {EventBus} from './event-bus.js'
console.log(EventBus)
export default {
  data(){
    return{
      num:1
    }
  },

  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num:this.num++
      })
    }
  }
}
</script>
```

3. 接收事件

```vue
// showNum.vue 中接收事件
<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>
```

这样就实现了在组件`addtionNum.vue`中点击相加按钮, 在`showNum.vue`中利用传递来的 `num` 展示求和的结果.

4. 移除事件监听者

如果想移除事件的监听, 可以像下面这样操作:

```js
import { eventBus } from 'event-bus.js'
EventBus.$off('addition', {})
```

`Vue.observable小型状态管理(vue.js 2.6增加)`

1. 首先创建一个 store.js，包含一个 store和一个 mutations，分别用来指向数据和处理方法。

```js
//store.js
import Vue from 'vue';

export let store =Vue.observable({count:0,name:'李四'});
export let mutations={
    setCount(count){
        store.count = count;
    },
    changeName(name){
        store.name = name;
    }
}
```

```vue
<script>
    /**
     *	引入 store.js
     *  store中的值可以在computed计算属性进行获取
     *  通过页面中的方法触发mutations中修改state的方法
     */
    import {store,mutations} from '@/store'
    export default {  
        data () {  
            return {  
                name1:'xxx'
            }  
        },  
        computed:{
            count(){
                return store.count
            },
            name(){
                return store.name
            }
        },
        methods:{
            setCount:mutations.setCount,
            changeName:mutations.changeName    
        }
    }  
</script> 
```

就是如果当前项目vue版本低于2.6，要使用Vue.observable()，就必须要升级，升级 vue 和 vue-template-compiler，两者的版本需要同步，如果不同步项目会报错。

```js
//升级vue版本
npm update vue -S 或者 yarn add vue -S
npm update vue-template-compiler -D 或者 yarn add vue-template-compiler -D
```

## ES6

1. 用`let` 和`const` 代替 var

2. 变量的解构赋值

3. 扩展运算符拷贝数组(深克隆)、合并数组

4. `entries()`，`keys()`和`values()`——用于遍历数组

   `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

   ```js
   for (let index of ['a', 'b'].keys()) {
     console.log(index);
   }
   // 0
   // 1
   
   for (let elem of ['a', 'b'].values()) {
     console.log(elem);
   }
   // 'a'
   // 'b'
   
   for (let [index, elem] of ['a', 'b'].entries()) {
     console.log(index, elem);
   }
   // 0 "a"
   // 1 "b"
   
   如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
   
   let letter = ['a', 'b', 'c'];
   let entries = letter.entries();
   console.log(entries.next().value); // [0, 'a']
   console.log(entries.next().value); // [1, 'b']
   console.log(entries.next().value); // [2, 'c']
   ```

   

5. 数组`find()`和`findIndex() `

   `find  `  返回符合条件的第一个元素，否则 `undefinde`

   `findIndex`  返回第一个符合条件的下标，否则 -1

6. `Object.assign(target，xxx)`第一个参数是目标对象，后面的参数都是源对象。同名属性，则后面的属性会覆盖前面的属性。第一个参数为空的话复制对象，属于浅拷贝
7. `set`可以用来进行单层去重

```js
// 去除数组的重复成员
[...new Set(array)]
// 去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
```

8. `async` 函数

   其实就是Generator的语法糖

   function *  xxx{

     yield 'aa' //  yield相当于暂停标记

   }

   xx.next() 拿到这个暂停的值，如果继续next 执行下一个yield节点

   

   `async`函数对 Generator 函数的改进：

   （1）内置执行器

   （2）更好的语义

   （3）更广的适用性

   （4）返回值是 Promise

   

## promise

promise 是javascript的异步操作的解决方案，为一步操作统一接口，它起到代理的作用，充当异步操作与回调之间的中介，使得异步操作写起来，就像在写同步操作的流程一样，而不必一层层的嵌套回调函数

promise实例具有有三种状态

pending(等待) fulfiled(成功) rejected(失败)

这三种的状态的变化途径只有两种。

- 异步操作成功，Promise 实例传回一个值（value），状态变为`fulfilled`。
- 异步操作失败，Promise 实例抛出一个错误（error），状态变为`rejected`

promise 实例的状态变化只可能发生一次，状态一旦改变就不会在变，创造promise实例后会立即执行

为什么会有promise?

1.解决回调地狱，代码难以维护，第一个函数的输出是第二个函数输入的对象

2.支持多个并发的请求

3.可以解决异步的问题，但是并不能说promise是异步的

Promise对象用于表示一个异步操作的最终完成(或失败)，及其结果值

缺点：

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

先执行同步任务（new Promise前半段同步执行）  异步操作会进入事件队列   先微后宏任务

微任务( promise.then )

宏任务( 定时器 延时器  )

## 路由 query 和 params 区别?

1.`query`传参跳转可以用路由的`name`也可以使用`path`，而`params`只支持`name`

2.`query`会在地址栏显示传入的参数`/login?id=xx&name=xxx` key=val，`params`相对安全`/login/212/小李` val

3.`query`传值页面刷新数据还在，而`params`传值页面数据消失。

## Vue中name作用？使用keep-alive？

name作用？

- 搭配keep-alive进行缓存过滤
- DOM做递归组件时，需要调用自身name
- vue-devtools调试工具里显示的组件名称由name决定

keep-alive使用？

- 是vue内置组件，可以使被包含的组件保留状态，避免重复渲染
- 一般结合路由和动态组件一起使用，用于缓存组件
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时触发 activated，当组件被移除时触发 deactivated

## Vue 为什么要用 vm.$set() 解决对象新增属性不能响应的问题？

为什么？

- vue使用Object.defineProperty实现双向绑定
- 在初始化实例时，对属性执行getter/setter转化
- 属性必须在data对象上存在，才能让vue将它转化为响应式数据(这也造成了vue无法检测对象属性的添加和删除)

所以提供了Vue.set(object，propertyName，value)/ vm.$set(object, propertyName, value)

vm.$set 的实现原理?

- 如果目标是数组，直接使用数组的splice方法触发响应式
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式
- 最终如果要对属性进行响应式处理，则是通过调用defineReactive方法进行响应式处理(defineReactive方法：就是Vue在初始化对象的时候，进行响应式处理时调用的方法)

## Vue 的性能优化

- 对象层级不要过深，否则性能就会差
- 减少DOM操作
- 缓存资源
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用