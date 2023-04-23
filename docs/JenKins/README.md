---
title: Jenkins部署
date: 2023-3-28
author: 吴立铎
categories:
- Jenkins
tags:
- Jenkins
isTimeLine: true
sidebar: false
isComment: false
---

注：Linux 安装docker地址https://blog.csdn.net/m0_59196543/article/details/124749175

注：Linux jenkins部署Java+vue项目 https://blog.csdn.net/qq_44901285/article/details/125619743

注：Linux  Jenkins自动化部署Vue项目 https://blog.csdn.net/qq_33286909/article/details/123004365

注：Linux  windows系统Jenkins自动化Vuehttps://blog.csdn.net/m0_46536382/article/details/123844189

注：Jenkins构建脚本 windows和Linux选择不同

![img](https://img-blog.csdnimg.cn/20201020101614802.png#pic_center)

# 1.利用docker 一键部署jenkins

docker run -p 8120:8080 jenkins/jenkins:jdk11

# 2.在jenkins中执行docker

1).jenkins 中安装docker客户端，使用第三方的docker

需要付费

2）。jenkins 中安装docker客户端，另一个容器中安装docker服务

dockier-in-docker，需要特权模式，或者第三方的工具

3）.jenkins中什么不装，直接使用宿主机的docker服务

优点：简单，方便，直观

缺点：Jenkins可以全权的管理所有容器（包含自己），有隐含安全风险

docker凭什么运行？

docker-cli

docker-scok

docker-server