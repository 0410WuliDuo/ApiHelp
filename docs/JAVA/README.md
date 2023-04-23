---
title: Java基础
date: 2023-3-28
author: 吴立铎
categories:
- Java
tags:
- Java
isTimeLine: true
sidebar: false
isComment: false
---
# JAVA

#### Java类型

 byte(位)、short(短整数)、int(整数)、long(长整数)、float(单精度)、double(双精度)、char(字符)和boolean(布尔值)。

大小对比

byte < short < int < long < float < double

#### Scanner 键盘录入

​                        (注：只能输入整数类型):

​                        1）. 导入import java.util.Scanner;

​                        2）. 创建对象Scanner sc = new Scanner(System.in);

​                        3）. 接受数据sc.nextInt()

#### java运算符

+，-，*，/，%

+，-，* 小数时有可能不精确

/ 整除参与计算获得是整数  小数参与计算有可能不精确

% 取模，取余

数值拆分：

​                  1）. 个位：数值%10

​                  2）. 十位：数值 /10 % 10

​                  3）. 百位：数值 / 100 % 10

​                   ..... 以此类推

隐式转换规则：

​         1）.取值范围小的，和取值范围大的进行运算，小的会先提升为大的，再进行运算。

​         2）.byte short char 三种类型的数据再运算的时候，都会直接提升为int，然后再进行运算

强制转换规则:

​           1）. 不允许取值范围大的值给取值范围小的 如果需要这么做使用强转

​           2）. int a = (int) b 直接（）内部写上类型

String 转其他类型 

​          例如：int a = 0； String b  = a + “”； 其他类型亦是如此

其他类型转String

​                    String a = “123”；

​          例如：int a =  Integer.parseInt(a)

​                      double a = Double.parseDouble(a)

​                      float a = Float.parseFloat(a)

​                      long a =  Long.parseLong(a)

​                      byte a =  Byte.parseByte(a)

​                      boolean a =  Boolean.parseBoolean("true")

​                      short a = Short.parseShort(a)

#### java进制转换

​         2进制 8进制 10进制 16进制

​        2进制转其他 基数乘*进制数*的权数次幂

​        10进制转其他 用根号除进制数取余数并倒叙排列

#### Java逻辑运算符

​        &&短路与并且 || 短路或者 ^异或 （判断两边相同为false 不同为true） ！取反

#### Java源码，反码，补码    ![image-20220812145639908](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220812145639908.png)

计算机一个字节是-128 ~ +127

​                            

