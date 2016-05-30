var Decompressor = (function () {
    function Decompressor(fact, ctx) {
        this.factory = fact;
        this.context = ctx;
    }
    Decompressor.prototype.decompress = function () {
        var imgData = this.context.getImageData(0, 0, 512, 512);
        var bmp = new Bitmap(imgData);
        var ranges = this.factory.build(bmp, 1);
        var domains = this.factory.build(bmp, 2);
        var info = GLOBALINFO.slice(0);
        this.doStep(ranges, domains, info, bmp);
    };
    Decompressor.prototype.doStep = function (ranges, domains, info, bmp) {
        var newBmp = new Bitmap(bmp.toImageData());
        for (var i = 0; i < info.length; ++i) {
            var indR = info[i].range;
            var range = ranges[indR];
            var indD = info[i].domain;
            var domain = domains[indD];
            this.updateMap(newBmp, range, domain, info[i]);
        }
        this.context.putImageData(newBmp.toImageData(), 0, 0);
    };
    Decompressor.prototype.updateMap = function (newBmp, range, domain, inf) {
        var coeff = domain.width / range.width;
        for (var x = 0; x < range.width; ++x) {
            for (var y = 0; y < range.height; ++y) {
                var color = domain.getPixel(x, y, coeff).r;
                color = color * inf.s + inf.o;
                var pxl = new Pixel(color, color, color, 255);
                newBmp.setPixel(pxl, range.start.x + x, range.start.y + y);
            }
        }
    };
    return Decompressor;
}());
//# sourceMappingURL=Decompressor.js.map