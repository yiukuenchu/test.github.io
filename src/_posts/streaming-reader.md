---
category: 
tags:
  - POI
  - code
date: 2018-10-16
title: StreamingReader流式读取大数据量文件
vssue-title: streaming-reader
---



# 前言

前一段时间在一个工作项目中，有一个我负责的功能模块是需要读取Excel文件中的数据。涉及到Java对Excel读写，有两种常见的Excel操作方法，分别是[JXL](https://www.cnblogs.com/puresoul/p/3502139.html)和[POI](https://blog.csdn.net/wwd0501/article/details/78780646)。这是它们之间的[区别](https://www.cnblogs.com/jyh317/p/4065959.html)。   
   

## POI  
考虑到 **数据量大** 的问题，我选择了效率较高的POI。简易代码如下：
``` 
//获取workbook对象
InputStream is = new FileInputStream(file);
Workbook wb = new Workbook(is);

ArrayList<String> sheetNames = new ArrayList<String>();

//遍历sheet名，存在sheetNames中
for(Sheet sheet : wb){
	String name = sheet.getSheetName();
	sheetNames.add(name);
}

wb.close();
```
这里只写了遍历sheet名，就不写如何遍历单元格了（才不是我懒咧😅～），想要了解的小可爱们可以点击上面的POI链接参考。  
  
有的人会说，看上去似乎没有问题诶～（我当时也是这么想的，太简单了！）   
   
但是代码一跑起来，完了，是讨人厌的Out of Memory异常诶～分析过后，初步确认是Excel文件中的数据量太大，哪怕是空行，POI也会把这些空行数据读入内存，最终导致内存溢出。   
     
     
## 修改Run Configurations
查了一下资料，有人提出通过修改运行内存（调试内存）的方法，解决内存溢出问题。参数为：   
>-Xms1000M -Xmx1000M   
  
  
![](https://ws2.sinaimg.cn/large/006tNbRwgy1fwa0hms8iuj30k20eeq2y.jpg)  
   
满怀期待的点了Debug，可是结果还是同样内存溢出。

# 🌟StreamingReader
找了很多方法后，大部分都是讲POI读取的实现，没啥实际帮助嘛简直！😠   
最终在stackoverflow上找到了一个不同的解决办法，👉[使用StreamingReader](https://stackoverflow.com/questions/48337588/poi-streamingreader)。  
  
## 实现   
要在pom.xml中添加依赖：
```
<dependency>
	<groupId>com.monitorjbl</groupId>
	<artifactId>xlsx-streamer</artifactId>
	<version>1.2.0</version>
</dependency>
```
实现代码为：
```
InputStream is = new FileInputStream(file);
Workbook wb= StreamingReader.builder()
	.rowCacheSize(100)	//设置缓存的行数，默认是10
	.bufferSize(4096)	//设置缓存到内存的字节大小，默认是1024
	.open(is);	//打开资源
```
其他代码则是相同的了。  
  
## 原理
把一部分的行先缓存到内存中，如上面代码我设置为缓存100行；这样就避免了一次性加载所有的行数据到内存中引起内存溢出。通过这种 **流式读取**的方式，读取大数据量大Excel文件时就不会报out of memory啦！

# 结语
这种方式读取速度也是非常快，十几万行道数据，在几秒钟之内就能读取了出来。😄  
  
你也试试？

