export default function(vm, _getCb_, _setCb_) {
    const _data = vm.$data;
    for (let k in _data) {
        Object.defineProperty(vm, k, {
            get() {
                _getCb_ && _getCb_();
                return _data[k];
            },
            set(newVal) {
                if (newVal == _data[k]) return;
                _data[k] = newVal;
                _setCb_ && _setCb_(k, newVal);
            },
        });
    }
}