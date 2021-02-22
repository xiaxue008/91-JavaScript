function Dep() {
    this.subs = [];
}

Dep.prototype = {
    add(sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach((item) => {
            item.update();
        });
    },
};

function Watcher(vm, node, name) {
    Dep.target = this;
    this.vm = vm;
    this.node = node;
    this.name = name;
    //这里update的时候会触发第二次get
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update() {
        //这里执行的时候触发第二次get,加入观察者队列
        this.get();
        if (this.node.nodeName === 'INPUT') {
            //input
            this.node.value = this.value;
        }
        // if (this.node.nodeName === 'BUTTON') {
        //     //button
        //     this.node.value = this.value;
        // }
        if (this.node.nodeType === 3) {
            //input
            this.node.nodeValue = this.value;
        }
    },
    get() {
        this.value = this.vm.data[this.name]; // 触发相应属性的 get
    },
};
