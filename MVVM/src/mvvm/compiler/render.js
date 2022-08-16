import { createMark } from "../utils";

const evenPool = [];
const statePool = [];

const reg_even = /@(.*?)="(.*?)"/g;

const reg_state = /\{\{(.*?)\}\}/g;

export function render({ template, state, methods }, el) {
    el = document.querySelector(el);
    template = evenCompile(template);
    template = stateCompile(template, state);
    el.innerHTML = template;
}

function evenCompile(template) {
    template = template.replace(reg_even, function(node, key) {
        const even = node.split("=");
        const _mark = createMark();
        const evenPoolItem = {
            mark: _mark,
            type: even[0].slice(1),
            method: even[1],
        };
        evenPool.push(evenPoolItem);
        return `data-even-mark=${_mark}`;
    });
    return template;
}

function stateCompile(template, state) {
    // console.log(template);
    template = template.replace(reg_state, function(node, key) {
        console.log(node, key);
        
        return state[key.trim()];
    });
    return template;
}