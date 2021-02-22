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
                dep.add(Dep.target);
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            value = newValue;
            // 这里利用闭包 改变input值的时候 触发notify函数，更新整个视图
            dep.notify();
        },
    });
}
