function observer(data) {
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
    });
}

function defineReactive(data, key, value) {
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            //这里第一次赋初始值的时候Dep.target为null
            //第二次new Watch的时候触发了update 这时候Dep.target = this
            //将this加入了dep 观察者队列
            if (Dep.target) {
                console.log(Dep.target);
                dep.add(Dep.target);
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            console.log('这里我劫持到了属性' + key + ',其原来的值为' + value);
            value = newValue;
            // 这里利用闭包 改变input值的时候 触发notify函数，更新整个视图
            dep.notify();
            console.log('改变了原始值，新的值为' + newValue);
        },
    });
}
