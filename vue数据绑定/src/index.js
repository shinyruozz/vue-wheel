import Vue from "./Vue/index";

let vm = new Vue({
    el: "#app",
    data() {
        return {
            name: "大司",
            eat: "病例",
            zoom: [{
                    name: "电棍",
                    age: 23,
                },
                {
                    name: "炫神",
                    age: 23,
                },
                {
                    name: "若子",
                    age: 27,
                },
            ],
            info: {
                profession: "主播",
                age: 40,
                like: "吃槟榔",
                family: {
                    mom: "nomom",
                    age: 123,
                },
            },
        };
    },
});

vm.zoom.push({
    name: 4654,
    age: 465465,
});