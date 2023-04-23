---
title: React脚手架搭建
date: 2023-3-28
author: 吴立铎
categories:
- React
tags:
- React
isTimeLine: true
sidebar: false
isComment: false
---

## **React-Cli**
====

-----------------------------

### 1.创建 React-cli 命令:
```command
- ​ npx create-react-app '项目名称'
- ​ yarn start 或者 npm start 启动项目
```
### 2.导入 react 和 react-dom 两个包

```command
- import React from 'react'

- import ReactDOM from 'react-dom'
```
- React.createElement()方法用于创建 react 元素
- ReactDOM.render()方法负责渲染 react 元素到页面

### 3.JSX

- JSX 是 React 的核心内容
- JSX 标识 js 代码中写 HTML 结构,是 React 声明式的提现
- 使用 JSX 配合嵌入的 JS 表达式，条件渲染，列表渲染，可以描述任意 UI 结构
- 推荐使用 className 的方式给 JSX 添加样式
- React 完全利用 JS 语言自身的能力来编写 UI，而不是造轮子增强 HTML 功能

### 4.React 组件基础

- 组件的创建两种方式:函数组件和类组件

​1.函数组件:function 函数名(){reurn <div>我是函数组件</div>}

​2.类组件:import 类名 extends React.Component 

```javascript
{
​ constructor(props) {
​ super(props);
​ this.state = {
​ txt：“ ”
​ }
​ }

​ render() {

​ return <div>我是类组件</div>

​ }

​ }
```
- 无状态(函数)组件，负责静态结构展示
- 有状态(类)组件，负责更新 UI，让页面动起来
- 绑定事件注意 this 的指向问题

​ 1.{/_ 箭头函数绑定 this _/}
```javascript
​ <button onClick={() => this.handlejia()}>+1</button>

​ handlejia() {}
```
​ 2.{/_ bind 绑定 this _/}
```javascript
​ <button onClick={this.handlejian}>-1</button>

​ this.handlejian = this.handlejian.bind(this);
```
​ 3.{/_ class 绑定 this _/}
```javascript
​ <button onClick={this.handlecheng}>\*2</button>

​ handleChange = (e) => {}
```
- 推荐受控组件来处理表单

### 受控组件：
```javascript
​ <input

​ type="text"

​ name="txt"

​ value={this.state.txt}

​ onChange={this.handleChange}

​ \></input>

​ handleChange = (e) => {

​ const target = e.target;

​ const value = target.type === "checkbox" ? target.checked : target.value;

​ this.setState({

​ });

​ };
```
2. 非受控组件:Ref
```javascript
​ this.txtRef = React.createRef();

​ <input type="text" ref={this.txtRef}></input>

- 完全利用 js 语言能力创建组件,这是 React 的思想

### 5.组件通讯介绍

- ​ props：<Hello name='我是小明' />

​ 函数组件： Hello = (props) =>{

​ const name = props.name

​ return <div>{name}</div>

​ }

​ 类组件:class Hello extends React.Component {

​ constructor(props) {

​ super(props);

​ this.state = {

​ txt: "",

​ };

​ }

​ const { name } = this.props

​ render(){

​ return <div>{name }</div>

​ }

​ }
```
​ props 特点：可以传递任何数据

​ props 父传子：利用 props 特性标签传值
```javascript
​ <child name='我是要传的值' />
```
​ props 子传父：利用回调函数传值

​ props 兄弟组件：利用相邻最近的父组件实现状态提升来进行数据交互

- 深层组件通信 Context

​ const { Provider, Consumer } = React.createContext();

​ <Provider></Provider> 用来传递数据

​ <Consumer></Consumer> 用来接

- props 深入

​ children：可以传任意类型

​ 效验：安装 prop-types (yarn add prop-types / npm i prop-types)

​ 导入 (import PropTypes from 'prop-types')

​ 使用 (组件名.propTypes = { colors: PropTypes.array})

​ 约束规则： 常见类型 (array ,bool,func,number,object,string)

​ React 元素类型:element

​ 必填项:isRequired

​ 特定结构的对象:shape({})

​ 默认值：组件名.defaultProps = {}

- 组件的生命周期:(\*只有类组件有生命周期)

​ 页面创建时：

​ constructor()：创建组件时最先执行,{1.初始化 state2.为事件处理程序绑定 this}

​ constructor(props){

​ super(props)

​ }

​ render()：每次组件渲染都会触发,{渲染 UI(注意:不能调用 setState())}

​ componentDidMount()：组件挂载(完成 DOM 渲染)后{1.发送网络请求 2.DOM 操作}

​ 页面更新时：触发更新三种方式(new props： 传入新的值,setState：修改新的值，forceUpdate()：强制更新方法)

​ render()：同上

​ componentDidUpdate()：组件更新(完成 DOM 渲染)后 {1.发送网络请求 2.DOM 操作 注意：如果要 setState()必须放在一个 if 条件中}

​ 页面卸载时:computer:：组件卸载（从页面消失）{执行清理工作（比如清理定时器等）}

render props 模式:

​ 子：
```javascript
​ <child render={(获取的 state)=>{return state}}></child>
```
​ 父：
```javascript
​ render(){ return this.props.render(this.state)}
```
children 模式：

​ 子：
```javascript
​ <child>{ (获取的 state) => {

​ return state

​ }}</child>
```
​ 父：
```javascript
​ render(){ return this.props.children(this.state)}
```
高阶组件介绍：

​ (HOC,Higher-Order Component) 是一个函数，接收要包装的组件，返回增强后的组件

​ 高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑的代码，通过 prop 将复用的状态传递给被包装组件 （WrappedComponent）

高阶组件使用：

​ 创建一个函数，名称约定以 with 开头

​ 指定函数参数，参数应该以大写字母开头（作为要渲染的组件）

​ 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回

​ 在该组件中，渲染参数组件，同时将状态通过 prop 传递给参数组件

​ 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中

​ <!-- withMouse高阶组件 -->
```javascript
​ function withMouse(WrappedComponent) {、

​ <!-- 用来写高阶组件复用逻辑 -->

​ class Mouse extends React.Component {

​ }

​ return Mouse

​ }

​ <!-- Mouse组件的render方法中 -->

​ return <WrappedComponent { ...this.state } />

​ <!-- 用来写高阶组件复用逻辑 -->

​ const MousePosition = withMouse（position）

​ <MousePosition />

​ 案例:https://www.bilibili.com/video/BV14y4y1g7M4?p=71&spm_id_from=pageDriver

设置 displayName:

​ Mouse.displayName = `withMouse$(getDisplayName(WrappedComponent))`

​ getDisplayName = () =>{

​ return WrappedComponent.displayName || WrappedComponent.name || 'Component';

​ }
```
高阶组件传递 Props: 在高阶组件中 return 返回的标签内添加{...this.props}
```javascript
this.setData()讲解:属于异步处理

​ 推荐语法：this.setData((state,prop) =>{

​ //state 中属于最新的值

​ console.log (state)

​ },()=>{

​ //异步数据处理

​ this.state.count //属于最新的状态值

​ })
```
钩子函数 shouldComponentUpdate(nextProps，nextState)

​ 作用:通过返回值决定该组件是否重新渲染，返回 true 表示重新渲染，false 表示不重新渲染

浅对比中 直接对比值是没有问题的 针对引用类型会有问题 因为引用类型对比会进行地址对比 所以针对对象或数组可使用 es6 中

{...对象，值}，[...原数组，新增数组] 数组也可以使用 cancat()链接 和 splice()插入 不可使用 push(),unshift()等直接改变数组的方法

虚拟 DOM 和 Diff 算法： 执行过程

​ 1.初次渲染时，react 会根据舒适 state（Model），创建一个虚拟 DOM 对象（树）。

​ 2.根据虚拟 DOM 生成真正的 DOM，渲染到页面中。

​ 3.当数据变化后（setState()，重新根据新的数据，创建新的虚拟 DOM 对象(树)）。

​ 4.与上一次得到的虚拟 DOM 对象，使用 Diff 算法对比(找不同)，得到需要更新的内容。

​ 5.最终，React 只将变化的内容更新（patch）到 DOM 中，重新渲染页面。

### 6.React 原理

#### 1.工作角度:应用第一，原理第二

#### 2.原理有助于更好的理解 React 的自身运行机制

#### 3setState()异步更新数据

#### 4.父组件更新导致子组件更新，纯组件提升性能

#### 5.思路清晰简单为前提，虚拟 DOM 和 Diff 保效率

#### 6.虚拟 DOM -> state+jsx

#### 7.虚拟 DOM 的真正价值从来都不是性能

### 7.React 路由

#### 1.安装路由命令 yarn add react-router-dom / npm i react-router-dom

#### 2.导入路由的三个核心组件: Router/Route/Link
```command
​ import { BrowserRouter as Router , Route,Link } from 'react-router-dom'

​ import { HashRouter as Router , Route,Link } from 'react-router-dom'

​ HashRouter 地址栏有 /#/
```
#### 3.Router 组件包裹整个应用

#### 4.Link 组件指定路由的入口 <Link to='地址(/first)'></Link>

#### 5.Route 指定路由的出口 <Route path='地址(/first)' component='{组件(First)}'></Route>

#### 6.编程时导航 this.props.history.push('地址')跳转 this.props.history.go('-1')返回

#### 7.默认路由 path 设置为‘/’

#### 8.模糊匹配:只要 pathname 是以 path 开头就会展示 。精确匹配:在需要的 Router 添加 exact 属性
