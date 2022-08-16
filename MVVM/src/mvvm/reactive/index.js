import { isObject } from "../utils";
import { handler } from "./handler";

export function createReactive(target) {
    if (!isObject(target)) {
        return target;
    }

    return stateReactive(target);
}

export function stateReactive(state) {
    return new Proxy(state, handler);
}