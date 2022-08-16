import { proxyData } from "./proxy";

function observer(target) {
    let keys = Object.keys(target);
    keys.map((key) => {
        let value = target[key];
        defineReactiveData(target, key, value);
    });
}

function defineReactiveData(target, key, value) {
    proxyData(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newVal) {
            console.log("set", newVal);
            if (newVal == value) return;
            proxyData(value);
            value = newVal;
        },
    });
}

export { observer };