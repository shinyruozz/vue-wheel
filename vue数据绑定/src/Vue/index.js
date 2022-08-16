import { proxyData } from "./proxy";

function Vue(options) {
    this.$el = options.el;
    this.$options = options;
    this._init(this);
}

Vue.prototype._init = function(vm) {
    let data = vm.$options.data;
    vm.$data = data = typeof data == "function" ? data() : data || {};
    initData(vm);
};

function initData(vm) {
    const _data = vm.$data;
    for (let key in _data) {
        Object.defineProperty(vm, key, {
            get() {
                return _data[key];
            },
            set(newVal) {
                _data[key] = newVal;
            },
        });
    }

    proxyData(_data);
}

export default Vue;