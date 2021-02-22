```JS
var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);//输出是什么？
```

第一个，fn()执行的时候，作用域是在函数定义的时候就确定了，所以此时 fn 内部 this 指向 window，打印 10

第二个，arguments[0]()，此时作为对象的一个属性调用，所以 this 指向 arguments 打印 2

```JS

var a = function(){this.b = 3};
var a = function(){this.b = 3}
var c = new a();
a.prototype.b = 9;
var b = 7;
a();
console.log(b); //7
console.log(c.b); //3

```
