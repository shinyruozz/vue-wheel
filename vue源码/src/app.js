import Vue from "vue";
let vm = new Vue({
    el: "#app",
    data() {
        return {
            name: "张三",
            say: "厉害",
            message: "你好啊",
            info: {
                age: 50,
                weight: "70kg",
                son: {
                    name: "李四",
                    like: "basketball",
                },
            },
            hobbies: [
                [1, 2], "football", "eat"
            ],
        };
    },

    computed: {
        fullName() {
            console.log(this.name, this.say);
            return this.name + this.say;
        },
    },

    watch: {
        name(newValue, oldValue) {
            // this.
            this.message = "hoihoihoo";
            console.log(newValue, oldValue);
        },
    },
});

setTimeout(function() {
    vm.name = "78798779s";
    vm.say = "挂";
    vm.hobbies[0].push(12132);
}, 3000);

console.log(vm);