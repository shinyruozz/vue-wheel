import { createReactive } from "./reactive";

function createGetter() {
    return function(target, key, receiver) {
        return Reflect.get(target, key, receiver);
    };
}

function createSetter() {
    return function(target, key, value, receiver) {
        createReactive(value);
        return Reflect.set(target, key, value, receiver);
    };
}

const get = createGetter();
const set = createSetter();

let handler = {
    get,
    set,
};

export default handler;