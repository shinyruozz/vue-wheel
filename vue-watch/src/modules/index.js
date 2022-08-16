import reactData from "./reachData";
import Computed from "./computed";
import Watch from "./watch";

class Vue {
    constructor(options) {
        this.$data = options.data();

        this.init(this, options.computed, options.watch);
    }

    init(vm, computed, watch) {
        this.initReactData(vm);
        this.initReactComputed(vm, computed);
        this.initReactWatch(vm, watch);
    }

    initReactData(vm) {
        reactData(
            vm,
            () => {},
            (key, newVal, oldVal) => {
                if (newVal == oldVal) {
                    return;
                }
                const _this = this;
                this.$watch(key, newVal, oldVal);

                this.$computed(key, function(key) {
                    _this.$watch(key, newVal, oldVal);
                });
            }
        );
    }

    initReactComputed(vm, computed) {
        const cpd = new Computed();

        for (let k in computed) {
            cpd.addComputed.call(cpd, vm, computed, k);
        }

        this.$computed = cpd.update.bind(cpd);
    }

    initReactWatch(vm, watch) {
        const wt = new Watch();

        for (let k in watch) {
            wt.addWatch.call(wt, vm, watch, k);
        }
        this.$watch = wt.transfer.bind(wt);
    }
}

export default Vue;