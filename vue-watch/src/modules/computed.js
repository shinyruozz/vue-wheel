class Computed {
    constructor() {
        this.computedResult = [];
    }

    addComputed(vm, computed, key) {
        const descriptor = Object.getOwnPropertyDescriptor(computed, key),
            descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;
        const dep = this._collectDep(descriptorFn);
        this._addComputedProp({
            key,
            value: descriptorFn.call(vm),
            get: descriptorFn.bind(vm),
            dep,
        });

        const dataItem = this.computedResult.find((item) => item.key == key);
        Object.defineProperty(vm, key, {
            get() {
                return dataItem.value;
            },
            set(newVal) {
                vm[key] = this.computedResult[key].get();
            },
        });
    }

    update(key, cb) {
        this.computedResult.map((item) => {
            const findRes = item.dep.find((d) => d == key);

            if (findRes) {
                item.value = item.get();
                cb && cb(item.key);
            }
        });
    }

    _addComputedProp(item) {
        this.computedResult.push(item);
    }

    _collectDep(origin) {
        const matches = origin.toString().match(/this\.(.+?)/g);
        return matches.map((item) => {
            return item.split(".")[1];
        });
    }
}

export default Computed;