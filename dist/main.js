function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $654d0cc2985fb667$exports = {};

$parcel$export($654d0cc2985fb667$exports, "NxRouter", () => $654d0cc2985fb667$export$c4374b7626f16606);
let $dba5cd6913742fdd$export$a3bc9b8ed74fc;
(function(error1) {
    error1["http-method-not-supported"] = "http-method-not-supported";
    error1["no-middlware-response"] = "no-middlware-response";
    error1["no-route-handler"] = "no-route-handler";
})($dba5cd6913742fdd$export$a3bc9b8ed74fc || ($dba5cd6913742fdd$export$a3bc9b8ed74fc = {}));


class $654d0cc2985fb667$export$c4374b7626f16606 {
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
            error: (0, $dba5cd6913742fdd$export$a3bc9b8ed74fc)["no-route-handler"],
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


var $faefaad95e5fcca0$exports = {};


$parcel$exportWildcard(module.exports, $654d0cc2985fb667$exports);
$parcel$exportWildcard(module.exports, $faefaad95e5fcca0$exports);


//# sourceMappingURL=main.js.map
