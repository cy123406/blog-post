---
title: 'java简介'
date: '2022-09-29'
tag:
	- java
---

### 编程语言：

Java这个语言，1995 年发展至今，生态强大,长期支持版本：JDK8 ，JDK11 , JDK17

JDK8：2014年发布

​	Java大部分的项目都是基于JDK8环境开发，支持了几乎所有的开发功能需求，设计比较完善。后续也跟新了一些新特性。如，Lambda表达式，函数式接口，方法引用，Stream API等比较流行的特性

JDK11：2018年发布（商用收费）

​	JDK11对比JDK8，除了有很多内部的升级（比如开销和时延更低的GC、TLS1.3加持等等）之外，对于初学使用者来说也有一些语言使用层面的进化。如多了类型推断关键词var ；官方HTTP Client。官方HTTP Client可以替代常用OKHttp,和HTTPClient

​	但是JDK11的生态不太行，参杂在JDK8与JDK17之间使用人数不多。（不推荐）

JDK17：2021年发布

​	Oracle 宣布 JDK 17 可以免费商用了

​	JDK17的垃圾回收机制优化了

![image-20220921135140540](C:\Users\601696\AppData\Roaming\Typora\typora-user-images\image-20220921135140540.png)

​	JDK 17对比JDK 8 延迟提升 60%，吞吐量提升 18%；	

​	Spring Framework 6 将采用 Java 17 和 Jakarta EE 9。

​	Spring Boot 3.0.0 最小依赖 Java17！

​	Java 之父 James Gosling 也表示，JDK 17 对比 JDK 8 有很大的提升，希望开发者尽快转到新版本中

但是JDK8的稳定性毋庸置疑，目前选择JDK8完全没问题，除非有SpringBoot3的需求

​	新特性：文本块，类似于C#中 @”......“ ，java17中为  “”“......”“”

​	swith语句优化：

```java
String text = switch (fruit) {
    case APPLE, PEAR ->  {
    	System.out.println("the given fruit was: " + fruit);
    	yield "{
    		"name": "John Doe",
    		"age": 45,
    		"address": "Doe Street, 23, Java Town"
			}4";
    case ORANGE, AVOCADO -> "Exotic fruit";
    default -> "Undefined fruit";
};
System.out.println(text);
```

​	新方法Stream.toList()



开发文档

https://www.oracle.com/java/technologies/javase-jdk8-doc-downloads.html





### 后端框架：springboot2.x 、springboot3.x 

最新稳定版2.7.3（推荐使用）

springboot3.x

新版本，稳定性没有时间的验证（不推荐）

![image-20220921151922260](C:\Users\601696\AppData\Roaming\Typora\typora-user-images\image-20220921151922260.png)



### 数据库：mysql：5.7 （比较经典的版本）、mysql：8.0

mysql5.7之后的一个版本就是mysql8.0，

-- mysql5.7和之前版本，默认字符集为latin1，直接插入中文会乱码需修改字符编码为utf8

-- mysql8.0开始，数据库默认字符编码改为utf8mb4。

-- mysql8.0 需要Navicat15以上的版本访问



### 数据库连接池：druid（德鲁伊）,HikariCP（Hikari: ひかり: 光）

![image-20220921163712144](C:\Users\601696\AppData\Roaming\Typora\typora-user-images\image-20220921163712144.png)

性能方面：HikariCP因为细节方面优化力度较大，性能方面强于Druid

功能丰富程度方面：Druid功能更全面除了具有连接池的基本功能以外，还支持sql级监控，支持扩展，防止SQL注入等功能。

使用热度：Druid在国内使用较多，国内有很多生产实践。HikariCP是spring boot 2.0以后默认连接池，在国外使用较多。

### 数据库连接框架Mybatis-plus

在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。 

**无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
**损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作，BaseMapper
**强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求，简单的CRUD操作不用自己编写。
**支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
**支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
**支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
**支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
**内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（自动生成代码）
**内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
**分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
**内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
**内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作




### 缓存：redis 

是一个高性能的key-value数据库，并提供多种语言的API。

常用于缓存，可替代Session。



### 网络通讯：Netty 

Netty提供异步的、[事件驱动](https://baike.baidu.com/item/事件驱动/9597519?fromModule=lemma_inlink)的网络应用程序框架和工具，用以快速开发高性能、高可靠性的[网络服务器](https://baike.baidu.com/item/网络服务器/99096?fromModule=lemma_inlink)和客户端程序。



### 测试：Junit 

单元测试工具。它由Kent Beck和Erich Gamma建立，逐渐成为源于Kent Beck的sUnit的xUnit家族中最为成功的一个。多数Java的开发环境都已经集成了JUnit作为单元测试的工具。



### 任务调度：Quartz

Quartz 是一个开源的作业调度框架，它完全由 Java 写成，并设计用于 J2SE 和 J2EE 应用中。它提供了巨大的灵 活性而不牺牲简单性。你能够用它来为执行一个作业而创建简单的或复杂的调度。它有很多特征，如：数据库支持，集群，插件，EJB 作业预构建，JavaMail 及其它，支持 cron-like 表达式等等