# 原型和闭包

先看一段代码

```JS
function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); //2
```

大白话解释就是，函数 bar 被当作值来传递。<strong>执行的时候不是在自己定义的作用域内执行</strong>！！但是依然可以获取到自身定义时的作用域内部的变量-------<strong>跨作用域取值</strong>
