import Vue from "./modules/index";

const vm = new Vue({
    data() {
        return {
            a: 1,
            b: 2,
        };
    },
    computed: {
        total() {
            console.log("computedtotal");
            return this.a + this.b;
        },
    },
    watch: {
        total(enwVal, oldVal) {
            console.log("total", enwVal, oldVal);
        },
        a(enwVal, oldVal) {
            console.log("a", enwVal, oldVal);
        },
        b(enwVal, oldVal) {
            console.log("b", enwVal, oldVal);
        },
    },
});

vm.a = 123;