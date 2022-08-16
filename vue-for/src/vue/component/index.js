const customTag = ["for"];
const reg_db_brackets = /\{\{(.*?)\}\}/g;
const reg_sg_brackets = /\{(.*?)\}/g;

export function initComponents(components) {
    const nodes = [];
    for (let i = 0; i < components.length; i++) {
        const { state, template } = components[i]();

        const node = compileTemplate(template, state);
        nodes.push(node);
    }
    return nodes;
}

function compileTemplate(template, data) {
    template = replaceVar(template, data, reg_db_brackets);
    const node = document.createElement("div");
    node.innerHTML = template;

    compileNode(node, data);

    return node;
}

function compileNode(node, data) {
    const allNode = node.querySelectorAll("*");

    allNode.forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (customTag.includes(tagName)) {
            replaceNode(el, data);
        }
    });
}

function replaceNode(el, data) {
    const tag = el.getAttribute("tag"),
        dataKey = el.getAttribute("data"),
        className = el.className;
    const oFrag = document.createDocumentFragment();

    data[dataKey].forEach((item) => {
        const replaceEle = document.createElement(tag);
        className ? (replaceEle.className = className) : "";
        replaceEle.innerHTML = replaceVar(el.innerHTML, item, reg_sg_brackets);
        oFrag.appendChild(replaceEle);
    });

    el.parentNode.replaceChild(oFrag, el);
}

function replaceVar(html, data, reg) {
    return html.replace(reg, (node, key) => {
        return data[key.trim()];
    });
}