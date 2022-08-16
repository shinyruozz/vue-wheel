import { initComponents } from "./component";
let componentNodes = null;
export function createApp(options) {
    for (let option in options) {
        switch (option) {
            case "components":
                componentNodes = initComponents(options[option]);
                break;
            default:
                break;
        }
    }

    return {
        mount,
    };
}

function mount(el) {
    const app = document.querySelector(el);
    const oFrag = document.createDocumentFragment();
    componentNodes.forEach((node) => {
        oFrag.appendChild(node);
    });
    app.appendChild(oFrag);
}