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
