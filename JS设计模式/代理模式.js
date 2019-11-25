//现实生活映射代码  
//代理可以单一职责原则 将一些不必要的操作交给代理去完成  
//记住这种思想 不方便自己内部完成的操作，可以找代理  
// 保护代理用于控制不同权限的对象对目标对象的访问
//虚拟代理用于把原本需要执行的操作暂存下来，等时间到了一次性执行 比如发送文件
//缓存代理用于将一些开销较大的计算的结果存储起来，下次的参数与之前的一致，便直接返回

//小明送花
class Flower {}

const xiaoming = {
  sendFlower: target => {
    const flower = new Flower();
    target.receiveFlower(flower);
  }
};

const B = {
  receiveFlower: gift => {
    A.receiveFlower(gift);
  }
};

const A = {
  receiveFlower: gift => {
    if (gift instanceof Flower) {
      console.log("收到花了");
    }
  }
};

xiaoming.sendFlower(A);

//发送文件  延迟发送，避免同时发送很多请求
const synchronousFile = cache => {
  console.log("发送请求", cache);
};

const proxySynchronousFile = (function() {
  const cache = [];
  let timer;
  return id => {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      synchronousFile(cache);
      cache = [];
      clearTimeout(timer);
    }, 2000);
  };
})();

const handleClick = id => {
  proxySynchronousFile(id);
};

//缓存代理  mult可以专注自己的职责  

const mult = function() {
  let a;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};

const proxyMult = (function() {
  const cache = {};
  return function() {
    const cacheKey = Array.from(arguments).join(",");
    if (!(cacheKey in cache)) {
      cache[cacheKey] = mult.apply(this, arguments);
    }
    return cache.cacheKey;
  };
})();
