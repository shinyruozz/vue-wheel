import { stateReactive } from ".";
import { isObject } from "../utils";

const get = getterHandle();
const set = setterHandle();

function getterHandle() {
    return function(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);

        return res;
    };
}

function setterHandle() {
    return function(target, key, value, receiver) {
        if (isObject(value)) {
            value = stateReactive(value);
        }
        const res = Reflect.set(target, key, value, receiver);
        return res;
    };
}

let handler = {
    get,
    set,
};

export { handler };