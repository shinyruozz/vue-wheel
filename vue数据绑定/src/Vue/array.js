import { proxyData } from "./proxy";

const _arr_methods_ = ["push", "pop", "shift", "unshift", "sort", "splice", "reverse"];

const originArrMethos = Array.prototype,
    arrMethos = Object.create(originArrMethos);

_arr_methods_.forEach((methods) => {
    arrMethos[methods] = function() {
        let args = originArrMethos.slice.call(arguments);

        originArrMethos[methods].apply(this, args);
        switch (methods) {
            case "push":
            case "shift":
                reactiveArr(args);
                break;
            case "splice":
                reactiveArr(args.slice(2));
                break;
            default:
                break;
        }
    };
});

function reactiveArr(arr) {
    arr.forEach((item) => {
        proxyData(item);
    });
}
export { arrMethos, reactiveArr };