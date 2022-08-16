var Vue = (function(doc) {
    var Vue = function(options) {
        var lifeCycle = {
            beforeCreate: options.beforeCreate.bind(this),
            create: options.create.bind(this),
            beforeMounted: options.beforeMounted.bind(this),
            mounted: options.mounted.bind(this),
        };
        lifeCycle.beforeCreate();

        this.$el = document.querySelector(options.el);
        this.$data = options.data();

        lifeCycle.create();

        this._init(this, options.template, options.methods, lifeCycle);
    };

    Vue.prototype._init = function(vm, template, methods, lifeCycle) {
        const container = doc.createElement("div");
        container.innerHTML = template;
        // dom显示信息
        const showPool = new Map();
        // dom绑定信息

        const evenPool = new Map();
        // 初始化数据
        initData(vm, showPool);

        initPool(container, methods, showPool, evenPool);

        bindEvent(vm, methods, evenPool);
        lifeCycle.beforeMounted();
        runder(vm, container, showPool);
        lifeCycle.mounted();
    };

    function initData(vm, showPool) {
        var _data = vm.$data;
        for (let k in _data) {
            if (_data.hasOwnProperty(k)) {
                Object.defineProperty(vm, k, {
                    get() {
                        return vm.$data[k];
                    },
                    set(val) {
                        vm.$data[k] = val;
                        updata(k, showPool, val);
                    },
                });
            }
        }
    }

    function initPool(container, methods, showPool, evenPool) {
        let eles = container.getElementsByTagName("*"),
            dom = null;

        for (let k in eles) {
            if (eles.hasOwnProperty(k)) {
                dom = eles[k];
                let vIfData = dom.getAttribute("v-if"),
                    vShowData = dom.getAttribute("v-show"),
                    click = dom.getAttribute("@click");
                if (vIfData) {
                    showPool.set(dom, {
                        type: "if",
                        prop: vIfData,
                        comment: doc.createComment("v-if"),
                    });
                } else if (vShowData) {
                    showPool.set(dom, {
                        type: "show",
                        prop: vShowData,
                    });
                }
                if (click) {
                    evenPool.set(dom, methods[click]);
                }
            }
        }
    }

    function bindEvent(vm, methods, evenPool) {
        for (const [dom, handler] of evenPool) {
            dom.addEventListener("click", methods[handler.name].bind(vm), false);
        }
    }

    function runder(vm, container, showPool) {
        for (const [dom, info] of showPool) {
            const { type, prop } = info;
            const propVal = vm[prop];
            switch (type) {
                case "if":
                    if (propVal) {
                        dom.parentNode.replaceChild(info.comment, dom);
                    }
                    break;
                case "show":
                    if (propVal) {
                        dom.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        }
        vm.$el.appendChild(container);
    }

    function updata(k, showPool, val) {
        for (const [dom, info] of showPool) {
            const { type, prop } = info;
            if (prop == k) {
                switch (type) {
                    case "if":
                        if (val) {
                            dom.parentNode.replaceChild(info.comment, dom);
                        } else {
                            info.comment.parentNode.replaceChild(dom, info.comment);
                        }
                        break;
                    case "show":
                        if (val) {
                            dom.style.display = "none";
                        } else {
                            dom.style.display = "block";
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return Vue;
})(document);

export default Vue;