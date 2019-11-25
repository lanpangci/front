//单例模式 只允许输入一次值，之后执行的结果都是相同的值 确保只有一个实例，并提供全局访问
//把执行函数和单例逻辑分离开，因为你不能确定执行函数的逻辑只有单例，可能以后需要多个实例

const CreateDiv = function(html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  const div = document.createElement("div");
  div.innerHTML = this.html;
  document.appendChild(div);
};

const getSingle = function(fn) {
  let instance = null;
  return function() {
    return instance || (instance = fn.apply(this, arguments.slice(1)));
  };
};

getSingle(CreateDiv)()