import Vue from "../module/index";

var vm = new Vue({
    el: "#app",
    data() {
        return {
            isShow: false,
            ifShow: false,
            list: [1, 2, 3, 4, 5],
        };
    },
    methods: {
        handleClick() {
            console.log(this);
            console.log(222);
            this.isShow = !this.isShow;
            this.ifShow = !this.ifShow;
        },
    },

    template: `
        <button @click='handleClick'>显示隐藏</button>
        <img width="400" v-if='ifShow' src="https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"/>
        <img width="400" v-show="isShow"src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109250135543096-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656576096&t=7b20552c68d4fc3f9af20c905c8bbccb"/>
    `,
    beforeCreate() {
        console.log(1);
    },
    create() {
        console.log(2);
    },
    beforeMounted() {
        console.log(3);
    },
    mounted() {
        console.log(4);
    },
});

console.log(vm);