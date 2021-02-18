function nodeToFragment(node, vm) {
    var flag = document.createDocumentFragment();
    var child;
    while ((child = node.firstChild)) {
        compile(child, vm);
        flag.appendChild(child);
    }
    return flag;
}

function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    if (reg.test(node.nodeValue)) {
        var name = RegExp.$1;
        name = name.trim();
        //input节点,这里第一次compile的时候会粗发get,赋初始值
        node.nodeValue = vm.data[name];
        //这里加入观察者，new对象的时候 触发update，会触发第二次get
        new Watcher(vm, node, name);
    }
    if (node.nodeType === 1) {
        //input节点,这里第一次compile的时候会粗发get，赋初始值
        node.value = vm.data['word'];
        node.addEventListener('input', (e) => {
            //这里为了实现双向绑定，不是赋值给node.value而是赋值给vm.data['word']
            vm.data['word'] = e.target.value;
        });
        //这里加入观察者，new对象的时候 触发update，会触发第二次get
        new Watcher(vm, node, 'word');
    }
}
