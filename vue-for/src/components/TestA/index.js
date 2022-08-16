import { createReactive } from "../../vue/reactive";

const state = createReactive({
    title: "this is TastA title",
    list: [{
            id: 1,
            name: "小明",
        },
        {
            id: 2,
            name: "小王",
        },
        {
            id: 3,
            name: "小李",
        },
    ],
});

// state.title = 4465;

let template = `
    <ul>
        <h1>{{title}}</h1>
        <for tag="li" data="list">{ name }</for>
    </ul>

`;

export default function() {
    return {
        state,
        template,
    };
}