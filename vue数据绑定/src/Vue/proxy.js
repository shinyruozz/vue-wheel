import { arrMethos, reactiveArr } from "./array";
import { observer } from "./observer";

function proxyData(target) {
    // 不是对象类型 则不操作
    if (typeof target !== "object" || target == null) return;
    observe(target);
}

function observe(target) {
    if (Array.isArray(target)) {
        // target.__proto__ = arrMethos;
        Object.setPrototypeOf(target, arrMethos);
        // console.log(target);
        reactiveArr(target);
    } else {
        observer(target);
    }
}

export { proxyData, observe };