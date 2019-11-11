const Singleton = function(name) {
  this.name = name;
};

Singleton.instance = null;

Singleton.getInstance = function(name) {
    console.log('this', this)
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const type1 = Singleton.getInstance('1')
const type2 = Singleton.getInstance('2')
console.log(type1 === type2)