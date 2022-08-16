let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.deps = [];
    }

    addDep() {
        this.deps.push(Dep.watcher);
    }

    invokeDep() {
        this.deps.forEach((watcher) => {
            watcher.updata(watcher);
        });
    }

    depend() {
        Dep.watcher.linkDep(this);
    }
}

let stack = [];

export function pushStackDep(watcher) {
    Dep.watcher = watcher;
    stack.push(watcher);
}

export function popStackDep() {
    stack.pop();
    Dep.watcher = stack[stack.length - 1];
}

export default Dep;