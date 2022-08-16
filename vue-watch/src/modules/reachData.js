function reachData(vm, getCb, setCb) {
    const _data = vm.$data;

    for (let k in _data) {
        Object.defineProperty(vm, k, {
            get() {
                getCb && getCb();
                return _data[k];
            },
            set(newVal) {
                const oldVal = _data[k];
                _data[k] = newVal;
                setCb && setCb(k, newVal, oldVal);
            },
        });
    }
}

export default reachData;