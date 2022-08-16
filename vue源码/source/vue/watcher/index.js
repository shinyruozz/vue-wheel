import Dep, { popStackDep, pushStackDep } from "../dep";
import { getTargetValue } from "../utils/tools";

let id = 0;
class Watcher {
    constructor(vm, fnOrExpr, cb = () => {}, opt = {}) {
        this.id = id++;
        this.vm = vm;

        this.watcherName = opt.name;

        if (typeof fnOrExpr == "function") {
            this.getter = fnOrExpr;
        } else {
            this.getter = function() {
                const value = getTargetValue(vm, fnOrExpr);
                //判断是不是第一次初始化
                if (!this.watchInit) {
                    this.watchInit = true;
                } else {
                    this.cb(this.oldValue, value);
                }
                this.oldValue = value;
            };
        }

        this.lazy = opt.lazy;
        this.dirty = this.lazy;
        this.deps = {};
        this.cb = cb;
        this.opt = opt;

        //如果是computed 初次不直接执行get
        this.value = this.lazy ? undefined : this.get();
    }

    get() {
        pushStackDep(this);
        const value = this.getter();
        popStackDep();
        return value;
    }

    //watch关联dep dep关联watch
    //一个dep可以对应watch 一个watch也可以对应多个dep
    linkDep(dep) {
        const depId = dep.id;

        if (!this.deps[depId]) {
            this.deps[depId] = dep;
            dep.addDep(this);
        }
    }

    // compute Watcher
    evaluate() {
        // 接收computed执行的结果
        const value = this.get();
        this.value = value;
        this.dirty = false;
    }

    run() {
        this.get();
    }

    // computed watcher内部被依赖的dep添加渲染watcher
    depend() {
        for (let key in this.deps) {
            this.deps[key].depend();
        }
    }

    updata(watch) {
        // 更新的watcher为computed时候
        if (watch.lazy) {
            this.dirty = true;
            // 后面渲染watcher调用可以执行evaluate函数
        } {
            if (!stackId[watch.id]) {
                stackId[watch.id] = true;
                queue.push(watch);
                nextTick(popStackUpdata);
            }
        }
    }
}

// 收集watch 后执行weatch 更新
let queue = [];
let stackId = {};

function popStackUpdata(watcher) {
    for (let i = 0; i < queue.length; i++) {
        queue[i].run();
    }
    queue = [];
    stackId = {};
}

let stackArr = [];

function nextTick(cb) {
    stackArr.push(cb);
    if (!Promise) {
        return Promise.resolve().then(popStack);
    } else {
        setTimeout(function() {
            popStack();
        }, 0);
    }
}

function popStack() {
    for (let i = 0; i < stackArr.length; i++) {
        stackArr[i]();
    }
    stackArr = [];
}

export default Watcher;