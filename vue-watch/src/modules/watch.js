class Watch {
    constructor() {
        this.watchResult = [];
    }

    addWatch(vm, watch, key) {
        const descriptor = Object.getOwnPropertyDescriptor(watch, key),
            descriptorFn = descriptor.value;

        this._addWatchProp({
            key,
            fn: descriptorFn.bind(vm),
        });
    }

    // 调用对应的监听
    transfer(key, newVal, oldVal, cb) {
        this.watchResult.map((watcher) => {
            if (key == watcher.key) {
                watcher.fn(newVal, oldVal);
                cb && cb();
            }
        });
    }

    _addWatchProp(watcher) {
        this.watchResult.push(watcher);
    }
}

export default Watch;