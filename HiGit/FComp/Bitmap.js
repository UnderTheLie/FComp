var Bitmap = (function () {
    function Bitmap(image) {
        this.data = image.data;
        this._width = image.width;
        this._height = image.height;
    }
    Object.defineProperty(Bitmap.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.getPixel = function (x, y) {
        var index = (y * this.width + x) * 4;
        var r = this.data[index];
        var g = this.data[++index];
        var b = this.data[++index];
        var a = this.data[++index];
        return new Pixel(r, g, b, a);
    };
    Bitmap.prototype.setPixel = function (pxl, x, y) {
        var index = (y * this.width + x) * 4;
        this.data[index] = pxl.r;
        this.data[++index] = pxl.g;
        this.data[++index] = pxl.b;
        this.data[++index] = pxl.a;
    };
    Bitmap.prototype.toImageData = function () {
        return new ImageData(this.data, this._width, this._height);
    };
    Bitmap.prototype.toGrayscale = function () {
        var pxl = new Pixel(0, 0, 0, 0);
        for (var x = 0; x < this.width; ++x) {
            for (var y = 0; y < this.height; ++y) {
                pxl = this.getPixel(x, y).toGrayscale();
                this.setPixel(pxl, x, y);
            }
        }
    };
    return Bitmap;
}());
//# sourceMappingURL=Bitmap.js.map