import handler from "./handler";
import { isObject } from "./uitls";

export function createReactive(data) {
    if (!isObject(data)) return data;
    return createReactiveData(data);
}

export function createReactiveData(data) {
    for (let key in data) {
        if (isObject(data[key])) {
            data[key] = createReactive(data[key]);
        }
    }
    return new Proxy(data, handler);
}