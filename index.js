import "reflect-metadata";
const METADATA_KEY = {
    INJECTION: Symbol('')
};
export function Init(contextInstance, instance) {
    InstanceData.Get(contextInstance, true).push(instance);
    return instance;
}
export function Factory() {
    return function (_target, _propertyKey, descriptor) {
        const fn = descriptor.value;
        if (typeof fn !== 'function') {
            throw new Error('Factory can only be used on methods');
        }
        descriptor.value = function (...args) {
            return Init(this, fn.apply(this, args));
        };
    };
}
export function Service() {
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(...args);
                InstanceData.Get(this, true).beforeInit = (container) => {
                    const injections = Reflect.getMetadata(METADATA_KEY.INJECTION, target);
                    if (injections) {
                        injections.map(injection => {
                            let value = Reflect.get(this, injection.key);
                            if (value === void 0) {
                                value = container.get(injection.token);
                                if (!value) {
                                    value = injection.reslover();
                                    container.set(injection.token, value);
                                }
                                Reflect.set(this, injection.key, value);
                            }
                            else {
                                container.set(injection.token, value);
                            }
                            return value;
                        }).forEach(value => container.init(value));
                    }
                };
            }
        };
    };
}
const tokenMap = new Map();
export function Inject(Token) {
    return function (target, key) {
        const Type = Reflect.getMetadata('design:type', target, key);
        let token = Token || Type;
        if (!token) {
            console.log(target, key, Token, Type);
            throw new Error('token must exist');
        }
        if (!isObject(token)) {
            if (tokenMap.has(token)) {
                token = tokenMap.get(token);
            }
            else {
                tokenMap.set(token, token = {});
            }
        }
        const originTarget = Reflect.get(target, 'constructor');
        const injections = Reflect.getMetadata(METADATA_KEY.INJECTION, originTarget) || [];
        injections.push(new Injection({
            key,
            token,
            reslover: () => Type ? new Type : {}
        }));
        Reflect.defineMetadata(METADATA_KEY.INJECTION, injections, originTarget);
    };
}
export function UseContainer() {
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(...args);
                new Container().init(this);
            }
        };
    };
}
export class Container {
    constructor() {
        this.weakMap = new WeakMap();
        this.resloverMap = new Map();
    }
    init(data) {
        var _a;
        (_a = InstanceData.Get(data)) === null || _a === void 0 ? void 0 : _a.init(this);
        return data;
    }
    get(token) {
        if (!this.weakMap.has(token)) {
            const reslover = this.resloverMap.get(token);
            if (reslover) {
                this.weakMap.set(token, reslover());
            }
        }
        return this.weakMap.get(token);
    }
    set(token, value) {
        this.weakMap.set(token, value);
    }
    register(token, reslover) {
        this.resloverMap.set(token, reslover);
    }
}
class Injection {
    constructor({ key, token, reslover }) {
        this.key = key;
        this.token = token;
        this.reslover = reslover;
    }
}
function isObject(x) {
    return typeof x === "object" ? x !== null : typeof x === "function";
}
class InstanceData {
    constructor() {
        this.children = [];
        this.isInit = false;
    }
    static Get(instance, create) {
        const data = Reflect.getMetadata(this.key, instance);
        if (!data && create) {
            const instanceData = new InstanceData;
            Reflect.defineMetadata(this.key, instanceData, instance);
            return instanceData;
        }
        return data;
    }
    init(container) {
        var _a;
        if (this.isInit) {
            return;
        }
        this.container = container;
        (_a = this.beforeInit) === null || _a === void 0 ? void 0 : _a.call(this, container);
        this.children.forEach(item => container.init(item));
        this.isInit = true;
    }
    push(data) {
        if (this.container) {
            this.container.init(data);
        }
        else {
            this.children.push(data);
        }
    }
}
InstanceData.key = Symbol('');
