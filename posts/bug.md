---
title: '踩坑笔记'
date: '2022-12-08'
tag:
	- bug
---

## window配置SqlServer订阅发布

### 坑1：

```sql
#名称不匹配检查方式
select @@servername,serverproperty('servername')
#解决方式
if   serverproperty('servername')   <>   @@servername  
begin  
    declare   @server   sysname  
    set   @server   =   @@servername   
    exec   sp_dropserver   @server   =   @server  
    set   @server   =   cast(serverproperty('servername')   as   sysname)  
    exec   sp_addserver   @server   =   @server   ,   @local   =   'LOCAL'  
end
```

### 坑2：

```sql
#SQL Server 代理（MSSQLSERVER）权限不足
#解决方案：
win+r services.msc 找到服务改权限
```

