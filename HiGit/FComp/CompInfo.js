var CompInfo = (function () {
    function CompInfo(r, d, s, o) {
        this._range = r;
        this._domain = d;
        this._s = s;
        this._o = o;
    }
    Object.defineProperty(CompInfo.prototype, "range", {
        get: function () {
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompInfo.prototype, "domain", {
        get: function () {
            return this._domain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompInfo.prototype, "s", {
        get: function () {
            return this._s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompInfo.prototype, "o", {
        get: function () {
            return this._o;
        },
        enumerable: true,
        configurable: true
    });
    return CompInfo;
}());
//# sourceMappingURL=CompInfo.js.map