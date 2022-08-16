export const reg_brackets = /\{\{(.+?)\}\}/g;

export function getTargetValue(target, key) {
    key = key.split(".");
    return key.reduce((prev, cur) => {
        return prev[cur];
    }, target);
}