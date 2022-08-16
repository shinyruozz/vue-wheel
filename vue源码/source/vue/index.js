import initState from "./state";
import { reg_brackets, getTargetValue } from "./utils/tools";
import Watcher from "./watcher";

function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function(options) {
    this.$options = options;
    const vm = this;

    initState(vm);

    if (options.el) {
        let el = queryElement(options.el);
        vm.mount(el);
    }
};

Vue.prototype.mount = function(el) {
    let node = document.createDocumentFragment(),
        vm = this;

    el.appendChild(node);

    const compileElement = () => {
        vm._updata(el);
    };

    new Watcher(vm, compileElement, () => {}, {
        name: "runder",
    });
};

Vue.prototype._updata = function(el) {
    let node = document.createDocumentFragment(),
        vm = this;

    while (el.firstChild) {
        node.appendChild(el.firstChild);
    }
    compileNode(vm, node);

    el.appendChild(node);
};

function compileNode(vm, node) {
    let childNodes = node.childNodes,
        child,
        nodeType;
    for (let i = 0; i < childNodes.length; i++) {
        child = childNodes[i];
        nodeType = child.nodeType;
        if (nodeType == 1) {
            compileNode(vm, child);
        } else if (nodeType == 3) {
            compileText(vm, child);
        }
    }
}

function compileText(vm, node) {
    if (!node.expr) {
        node.expr = node.textContent;
    }
    node.textContent = node.expr.replace(reg_brackets, function(node, key) {
        return JSON.stringify(getTargetValue(vm, key.trim()));
    });
}

function queryElement(el) {
    if (typeof el != "string" && !(el instanceof Element)) {
        throw new Error("el type error");
    }

    if (typeof el == "string") {
        return document.querySelector(el);
    }
    return el;
}

export default Vue;