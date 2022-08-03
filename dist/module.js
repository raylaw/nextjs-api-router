function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $72288473c65752a4$exports = {};

$parcel$export($72288473c65752a4$exports, "NxRouter", () => $72288473c65752a4$export$c4374b7626f16606);
let $c04235eee8e32194$export$a3bc9b8ed74fc;
(function(error1) {
    error1["http-method-not-supported"] = "http-method-not-supported";
    error1["no-middlware-response"] = "no-middlware-response";
    error1["no-route-handler"] = "no-route-handler";
})($c04235eee8e32194$export$a3bc9b8ed74fc || ($c04235eee8e32194$export$a3bc9b8ed74fc = {}));


class $72288473c65752a4$export$c4374b7626f16606 {
    routes = [];
    rootPath = [];
    addRoute(pattern, methods, handler) {
        this.routes.push({
            pattern: [
                ...this.rootPath,
                pattern
            ].join("/"),
            handler: handler,
            methods: methods
        });
    }
    handle(prefix, { req: req , res: res  }) {
        const { method: method  } = req;
        const url = req.url?.split("?")[0] ?? "";
        for (const { handler: handler , pattern: pattern , methods: methods  } of this.routes){
            const regex = new RegExp(`^${[
                "",
                prefix,
                pattern
            ].join("/")}/\?$`);
            if (method && methods[method] && regex.test(url ?? "")) {
                const ctx = {
                    req: req,
                    res: res
                };
                return handler(ctx);
            }
        }
        res.status(400).json({
            error: (0, $c04235eee8e32194$export$a3bc9b8ed74fc)["no-route-handler"],
            url: url
        });
    }
    route(pattern, methods, handler) {
        const hash = Object.fromEntries(methods.map((v, i)=>[
                v,
                true
            ]));
        this.addRoute(pattern, hash, handler);
    }
    group(pattern, cb) {
        this.rootPath.push(pattern);
        cb();
        this.rootPath.splice(-1);
    }
    patch(pattern, handler) {
        this.addRoute(pattern, {
            PATCH: true
        }, handler);
    }
    delete(pattern, handler) {
        this.addRoute(pattern, {
            DELETE: true
        }, handler);
    }
    put(pattern, handler) {
        this.addRoute(pattern, {
            PUT: true
        }, handler);
    }
    get(pattern, handler) {
        this.addRoute(pattern, {
            GET: true
        }, handler);
    }
    post(pattern, handler) {
        this.addRoute(pattern, {
            POST: true
        }, handler);
    }
    any(pattern, handler) {
        this.addRoute(pattern, {
            PATCH: true,
            PUT: true,
            DELETE: true,
            GET: true,
            POST: true,
            OPTIONS: true,
            HEAD: true
        }, handler);
    }
}


var $81c1b644006d48ec$exports = {};




export {$72288473c65752a4$export$c4374b7626f16606 as NxRouter};
//# sourceMappingURL=module.js.map
