import observe from ".";

function customArrayProtoFn() {
    let arrayMethods = Array.prototype,
        customMethods = ["push", "pop", "unshift", "shift", "splice", "sort", "reverse"],
        customMethodsObj = Object.create(arrayMethods);

    customMethods.forEach(function(method) {
        customMethodsObj[method] = function(...args) {
            let result = arrayMethods[method].apply(this, args);

            let insertValue;
            switch (method) {
                case "push":
                case "unshift":
                    insertValue = args;
                case "splice":
                    insertValue = args.slice(2);
            }

            ArrayObserve(insertValue);
            this._ob_.invokeDep();
            console.log(this);
            return result;
        };
    });

    return customMethodsObj;
}

export function ArrayObserve(arr) {
    for (let i = 0; i < arr.length; i++) {
        observe(arr[i]);
    }
}

export function arrayDepend(arr) {
    arr._ob_.depend();
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
            arrayDepend(item);
        }
    }
}

export { customArrayProtoFn };