import { arrRegExp, isCapitalRegExp, objRegExp } from "./uitls";

export const compileAttr = function(vm, el, name, value) {
    value = value.replace(/\s/g, "");
    switch (name) {
        case "class":
            let classStr = "";
            if (objRegExp.test(value)) {
                value = value.substring(1, value.length - 1);

                let objAttr = value.split(",");
                objAttr.map((item) => {
                    const itemArr = item.split(":");
                    classStr += vm[itemArr[1]] ? " " + itemArr[0] : "";
                });
                classStr = classStr.trim();
            } else if (arrRegExp.test(value)) {
                classStr = transformArr(vm, value).join(" ");
            }

            classStr ? el.setAttribute("class", classStr.trim()) : el.removeAttribute("class");

            break;
        case "style":
            let styleStr = "";
            if (objRegExp.test(value)) {
                value = value.substring(1, value.length - 1);
                let arrAttr = value.split(",");
                arrAttr.map((item) => {
                    const itemArr = item.split(":");
                    let styleKey = itemArr[0];
                    //转化浏览器可识别的 kebab-case
                    if (isCapitalRegExp.test(styleKey)) {
                        styleKey = styleKey.replace(isCapitalRegExp, "-$1").toLowerCase();
                    }
                    styleStr += `${styleKey}:${vm[itemArr[1]]};`;
                });
            } else if (arrRegExp.test(value)) {
                let arr = transformArr(vm, value);
                styleStr = arr.reduce(function(pre, item) {
                    return Object.assign(pre, item);
                }, {});
                styleStr = JSON.stringify(styleStr)
                    .replace(/^{(.+?)}$/, "$1")
                    .split(",")
                    .join(";");
                styleStr = styleStr.replace(/"/g, "");
            }

            styleStr ? el.setAttribute("style", styleStr.trim()) : el.removeAttribute("style");

            break;
        default:
            break;
    }
};

function transformArr(vm, target) {
    return new Function(
        "vm",
        `   with(vm) {
            return ${target}
        }
        `
    )(vm);
}