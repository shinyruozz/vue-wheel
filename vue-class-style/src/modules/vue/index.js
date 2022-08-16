import activeData from "./activeData";
import { compileAttr } from "./compile";

class Vue {
    constructor(options) {
        const { el, data, template, computed } = options;
        this.$data = data();
        this.$el = document.querySelector(el);

        this.init(this, template, computed);
    }

    init(vm, template, computed) {
        this.initActiveData(vm);
        this.initCompile(vm, template);
    }
    initActiveData(vm) {
        activeData(
            vm,
            () => {},
            (key, newVal) => {
                for (let [el, info] of this.$eleInfoPool) {
                    info.map((item) => {
                        const { type, value } = item;

                        if (item.value.indexOf(key) != -1) {
                            compileAttr(vm, el, type, value);
                        }
                    });
                }
            }
        );
    }

    initCompile(vm, template) {
        const container = document.createElement("div");
        container.innerHTML = template;
        this.$eleInfoPool = new Map();

        this.compileAttrs(vm, container);
        container.className = "wrap";
        this.$el.appendChild(container);
    }

    compileAttrs(vm, container) {
        const allNodes = [...container.getElementsByTagName("*")];

        allNodes.forEach((node) => {
            const attrs = [...node.attributes],
                infoItem = [];
            attrs.forEach((attr) => {
                let { name, value } = attr;
                name = name.substring(1);

                infoItem.push({
                    type: name,
                    value,
                });
                compileAttr(vm, node, name, value);
            });
            node.removeAttribute(":class");
            node.removeAttribute(":style");

            this.$eleInfoPool.set(node, infoItem);
        });
    }
}

export default Vue;