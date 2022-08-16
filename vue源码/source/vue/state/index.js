import Dep from "../dep";
import observe from "../observe";
import Watcher from "../watcher";

function initState(vm) {
    if (vm.$options.data) {
        initData(vm);
    }
    if (vm.$options.computed) {
        initComputed(vm);
    }
    if (vm.$options.watch) {
        initWatch(vm);
    }
}

function initData(vm) {
    let data = vm.$options.data;

    data = vm.$data = typeof data == "function" ? data() : data || {};

    //外层代理
    for (let key in data) {
        Object.defineProperty(vm, key, {
            get() {
                return data[key];
            },
            set(newValue) {
                data[key] = newValue;
            },
        });
    }

    observe(data);
}

function initComputed(vm) {
    let computed = vm.$options.computed;
    let computWatches = (vm._computedWatches = Object.create(null));

    // vm最外层做代理
    for (let key in computed) {
        // 每个computed对应一个watcher
        computWatches[key] = new Watcher(vm, computed[key].bind(vm), () => {}, {
            lazy: true,
            name: key + "computed",
        });
        // 获取computed 实际在操作对应watcher
        Object.defineProperty(vm, key, {
            get: computedGetter(key),
        });
    }

    function computedGetter(key) {
        let watcher = computWatches[key];

        return function() {
            if (watcher.dirty) {
                watcher.evaluate();
            }

            if (Dep.watcher) {
                watcher.depend();
            }

            return watcher.value;
        };
    }
}

function initWatch(vm) {
    let watch = vm.$options.watch;

    let keys = Object.keys(watch);
    keys.forEach((key) => {
        new Watcher(
            vm,
            key,
            (newValue, oldValue) => {
                watch[key].call(vm, newValue, oldValue);
            }, {
                user: true,
            }
        );
    });
}

export default initState;