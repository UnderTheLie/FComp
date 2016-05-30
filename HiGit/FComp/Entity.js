var Entity = (function () {
    function Entity(image, start, width, height) {
        this._start = start;
        this._width = width;
        this._height = height;
        this._parent = image;
    }
    Object.defineProperty(Entity.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.getPixel = function (x, y, sizeCoeff) {
        if (!sizeCoeff) {
            return this._parent.getPixel(this.start.x + x, this.start.y + y);
        }
        else {
            var avg = 0;
            for (var i = 0; i < sizeCoeff; ++i) {
                for (var j = 0; j < sizeCoeff; ++j) {
                    avg += this._parent.getPixel(this.start.x + x + i, this.start.y + y + j).r;
                }
            }
            avg /= sizeCoeff * sizeCoeff;
            return new Pixel(avg, avg, avg, 255);
        }
    };
    return Entity;
}());
//# sourceMappingURL=Entity.js.map