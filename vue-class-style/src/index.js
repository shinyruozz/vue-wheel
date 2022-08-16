import "./index.scss";

import Vue from "./modules/vue";

const vm = new Vue({
    el: "#app",
    data() {
        return {
            isCur: true,
            isShow: false,
            fontSize: "80px",
            color: "orange",
            isOrang: true,
            basePCls: {
                backgroundColor: "red",
                height: "30px",
                "font-size": "18px",
            },
            baseP2Cls: {
                color: "orange",
            },
        };
    },
    computed: {
        headerCls() {
            return {
                header: true,
                isCur: this.isCur,
            };
        },
    },

    template: `
        <div :class="{cur:isCur, orange:isCur}"  :style="{height:fontSize,backgroundColor:color}">this is header</div>
        <div :class="['content',isCur ? color:'' ]">this is content</div>
        <p :style="{height:fontSize,backgroundColor:color}">465465</p>
        <p :style="[baseP2Cls,basePCls]">dsadsadsad</p>
    `,
});
vm.isCur = false;
vm.fontSize = "45px";
console.log(vm);