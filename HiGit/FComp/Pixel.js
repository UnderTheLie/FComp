var Pixel = (function () {
    function Pixel(red, green, blue, alpha) {
        this._r = red;
        this._g = green;
        this._b = blue;
        this._a = alpha;
    }
    Object.defineProperty(Pixel.prototype, "r", {
        get: function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pixel.prototype, "g", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pixel.prototype, "b", {
        get: function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pixel.prototype, "a", {
        get: function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    Pixel.prototype.toGrayscale = function () {
        var avg = 0.299 * this._r + 0.587 * this._g + 0.114 * this._b;
        this._r = avg;
        this._g = avg;
        this._b = avg;
        return this;
    };
    return Pixel;
}());
//# sourceMappingURL=Pixel.js.map