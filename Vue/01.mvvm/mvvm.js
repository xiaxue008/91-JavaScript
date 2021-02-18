var MVVM = function (options) {
    this.data = options.data;
    this.$options = options;

    observer(options.data);

    var app = document.querySelector(options.el);
    var dom = nodeToFragment(app, this);
    app.appendChild(dom);
};
