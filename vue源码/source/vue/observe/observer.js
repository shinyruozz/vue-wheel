import Dep from "../dep";
import { customArrayProtoFn, ArrayObserve, arrayDepend } from "./array";
import observe from "./index";

let customArrPro = customArrayProtoFn();

class Observer {
    constructor(data) {
        if (Array.isArray(data)) {
            let dep = new Dep();
            Object.setPrototypeOf(data, customArrPro);

            //数组内部监听
            data._ob_ = dep;
            ArrayObserve(data);
        } else {
            this.walk(data);
        }
    }

    walk(data) {
        let keys = Object.keys(data);
        keys.forEach((key) => {
            let value = data[key];
            createReative(data, key, value);
        });
    }
}

export function createReative(target, key, value) {
    observe(value);
    let dep = new Dep();
    Object.defineProperty(target, key, {
        get() {
            if (Dep.watcher) {
                dep.depend();
                if (Array.isArray(value)) {
                    // 给arr内部收集依赖
                    arrayDepend(value);
                }
            }
            return value;
        },
        set(newValue) {
            if (newValue == value) return;

            observe(value);
            value = newValue;
            dep.invokeDep();
        },
    });
}

export default Observer;