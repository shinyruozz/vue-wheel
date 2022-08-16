export function isObject(target) {
    return typeof target == "object" && target !== null;
}

export function createMark() {
    return new Date().getTime() + parseInt(Math.random() * 10);
}