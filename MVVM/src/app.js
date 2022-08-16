const { createReactive, useDOM } = require("./mvvm");

const App = function() {
    let state = createReactive({
        count: 0,
        name: "张三",
        info: {},
    });

    return {
        template: `
            <h1>{{ name }}</h1>
            <span> {{ count }}</span>
            <button @click="add(1)">+</button>
            <button @click="minus(1)">+</button>
        `,
        state,
        methods: {
            add(num) {
                state.count += num;
            },
            minus(num) {
                state.count -= num;
            },
        },
    };
};

useDOM(App(), "#app");