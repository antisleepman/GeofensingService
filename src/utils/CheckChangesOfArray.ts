export default function monitor(obj, cb) {
    if (Object(obj) !== obj) return obj;
    for (let key of Object.keys(obj)) {
        obj[key] = monitor(obj[key], cb);
    }
    return new Proxy(obj, {
        defineProperty(...args) {
            cb();
            return Reflect.defineProperty(...args);
        },
        deleteProperty(...args) {
            cb();
            return Reflect.deleteProperty(...args);
        },
        set(...args) {
            cb();
            return Reflect.set(...args);
        }
    });
};