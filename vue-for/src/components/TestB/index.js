import { createReactive } from "../../vue/reactive";

const state = createReactive({
    title: "this is TastB title",
    list: [{
            id: 1,
            name: "大司",
        },
        {
            id: 2,
            name: "昊龙",
        },
        {
            id: 3,
            name: "侯国玉",
        },
        {
            id: 4,
            name: "腾阳天下",
        },
    ],
});

let template = `
    <ul>
        <h1>{{title}}</h1>
        <for tag="li" data="list" class="item">{name}</for>
    </ul>

`;

export default function() {
    return {
        state,
        template,
    };
}