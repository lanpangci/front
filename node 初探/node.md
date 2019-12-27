### events

events 模块是 Node.js 实现事件驱动的核心,在 node 中大部分的模块的实现都继承了 Events 类。比如 fs 的 readstream,net 的 server 模块。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装,EventEmitter 本质上是一个观察者模式的实现。

所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。

EventEmitter 对象使用 eventEmitter.emit()触发事件,当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。

---

绑定多个事件监听器时,事件监听器按照注册的顺序执行。

当监听器函数被调用时， this 关键词会被指向监听器所绑定的 EventEmitter 实例。也可以使用 ES6 的箭头函数作为监听器,但 this 关键词不会指向 EventEmitter 实例。

```
const EventEmitter = require('events')

class Application extends EventEmitter {}

const app = new Application()

app.on('hello', data => {
    console.log(this)
    console.log(data)
})

app.on('hello', function(data) {
    console.log(this)
    console.log(data)
})

app.emit('hello', 'hello nodeJs')
```

EventEmitter 以注册的顺序同步地调用所有监听器。 是同步的。

监听器函数可以使用 setImmediate() 和 process.nextTick() 方法切换到异步的操作模式。 先执行 nextTick，再执行 setImmediate

```
const EventEmitter = require("events");

class Application extends EventEmitter {}

const app = new Application();

app.on("hello", data => {
  setImmediate(() => {
    console.log(this);
    console.log(data);
    console.log("================");
  });
});

app.on("hello", function(data) {
  process.nextTick(() => {
    console.log(this);
    console.log(data);
    console.log("==================");
  });
});

app.emit("hello", "hello nodeJs");
console.log('测试')

```

使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。

移除事件监听器 eventEmitter.removeListener(name, func) 与 removeEventListener 类似

-----

### path   

获取路劲的目录名   
```
const path = require('path')

path.dirname('/path/example/index.js') // /path/example
```  

-----  

获得文件的扩展名  
```
const path = require('path')  

console.log(path.extname('./index.js'))
```  

-----  

是否是绝对路径  
```
const path = require('path')

path.isAbsolute('/path/example/index.js') // true

path.isAbsolute('.') // false
```  

-----  

拼接路径片段  
```
path.join('/path', 'example', './index.js') // /path/example/index.js  
```  

-----  

将路径或路径片段的序列解析为绝对路径  
```
path.resolve('/foo/bar', './baz')
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```  

-----  

规范化路径  
```
path.normalize('/path///example/index.js') //  /path/example/index.js
```

-----  

解析路径  
```
path.parse('/path/example/index.js')
/*
 { root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index' }
*/  
```    

序列化路径  
```
path.format({
  root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}) // /path/example/index.js
```  
-----  

获取 from 到 to 的相对路径  
```
path.relative('/path/example/index.js', '/path') // ../..
```
-----  

### fs  

读取文件  
```
const fs = require('fs')
const fs = require('fs')

// 异步读取
fs.readFile('./index.txt', 'utf8', (err, data) => {
  console.log(data) //  Hello Nodejs
})

// 同步读取
const data = fs.readFileSync('./index.txt', 'utf8')

console.log(data) //  Hello Nodejs

// 创建读取流
const stream = fs.createReadStream('./index.txt', 'utf8')

// 这里可以看到fs.createReadStream用到了我们前面介绍的events eventEmitter.on() 方法来监听事件
stream.on('data', data => {
  console.log(data) // Hello Nodejs
})
```  

---   

写入/修改文件 写入文件时,如果文件不存在,则会创建并写入,如果文件存在,会覆盖文件内容.  
```
const fs = require('fs')
// 异步写入
fs.writeFile('./write.txt', 'Hello Nodejs', 'utf8', err => {
  if (err) throw err
})
// 同步写入
fs.writeFileSync('./writeSync.txt', 'Hello Nodejs')
// 文件流写入
const ws = fs.createWriteStream('./writeStream.txt', 'utf8')
ws.write('Hello Nodejs')
ws.end()
```  

---  

删除文件  
```
// 异步删除文件
fs.unlink('./delete.txt', err => {
  if (err) throw err
})

// 同步删除文件
fs.unlinkSync('./deleteSync.txt')
```

删除文件夹  
```
// 异步删除文件夹
fs.rmdir('./rmdir', err => {
  if (err) throw err
})

// 同步删除文件夹
fs.rmdirSync('./rmdirSync')
```  
创建文件夹  
```
// 异步创建文件夹
fs.mkdir('./mkdir', err => {
  if (err) throw err
})

// 同步创建文件夹
fs.mkdirSync('./mkdirSync')
```
---  

重命名文件/文件夹  
```
const fs = require('fs')

// 异步重命名文件
fs.rename('./rename.txt', './rename-r.txt', err => {
  if (err) throw err
})

// 同步重命名文件夹
fs.renameSync('./renameSync', './renameSync-r')
```
---  
复制文件/文件夹
```
const fs = require('fs')

// 异步复制文件
fs.copyFile('./copy.txt', './copy-c.txt', (err, copyFiles) => {
  if (err) throw err
})

// 同步复制文件夹
fs.copyFileSync('./null', 'null-c')
```

文件夹状态- 文件/文件夹  绝对路径  
```
const fs = require('fs')

// 异步获取文件状态
fs.stat('./dir', (err, stats) => {
  if (err) throw err
  // 是否是文件类型
  console.log(stats.isFile()) // false
  // 是否是文件夹类型
  console.log(stats.isDirectory()) // true
})

// 同步获取文件状态
const stats = fs.statSync('./stats.txt')

// 是否是文件类型
console.log(stats.isFile()) // true
// 是否是文件夹类型
console.log(stats.isDirectory()) // false
```  

-----  

### process  

process 是 EventEmitter 的一个实例，所以 process 中也有相关事件的监听。使用 process 对象，可以方便处理进程相关操作。  

process.argv 是一个当前执行进程折参数组，第一个参数是 node，第二个参数是当前执行的.js 文件名，之后是执行时设置的参数列表。  
```
node index.js --tips="hello nodejs"

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--tips=hello nodejs' ]
*/
```
----  
process.execArgv 属性会返回 Node 的命令行参数数组。  
```
node --harmony index.js --version

console.log(process.execArgv);  // [ '--harmony' ]

console.log(process.argv);

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--version' ]
*/
```