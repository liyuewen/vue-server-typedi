import "reflect-metadata";
export declare function Init<T>(contextInstance: any, instance: T): T;
export declare function Factory(): (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Service(): <T extends new (...args: any[]) => any>(target: T) => {
    new (...args: any[]): {
        [x: string]: any;
    };
} & T;
export declare function Inject(Token?: any): <T extends object>(target: T, key: string) => void;
export declare function UseContainer(): <T extends new (...args: any[]) => any>(target: T) => {
    new (...args: any[]): {
        [x: string]: any;
    };
} & T;
export declare class Container {
    weakMap: WeakMap<object, any>;
    resloverMap: Map<any, () => any>;
    init<T>(data: T): T;
    get(token: any): any;
    set(token: any, value: any): void;
    register(token: any, reslover: () => void): void;
}
