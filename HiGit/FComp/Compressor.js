var Compressor = (function () {
    function Compressor(fact, ctx) {
        this.factory = fact;
        this.context = ctx;
    }
    Compressor.prototype.compress = function () {
        var imgData = this.context.getImageData(0, 0, 512, 512);
        var bmp = new Bitmap(imgData);
        var ranges = this.factory.build(bmp, 1);
        var domains = this.factory.build(bmp, 2);
        var info = this.buildInfo(ranges, domains);
        GLOBALINFO = info.slice(0);
    };
    Compressor.prototype.buildInfo = function (ranges, domains) {
        var res = new Array();
        for (var i = 0; i < ranges.length; ++i) {
            var minDiff = Infinity;
            var minIndex = -1;
            for (var j = 0; j < domains.length; ++j) {
                var info = this.getInfo(i, j, ranges[i], domains[j]);
                var diff = this.getDiff(ranges[i], domains[j], info);
                if (diff < minDiff) {
                    minDiff = diff;
                    minIndex = j;
                }
            }
            var finalInfo = this.getInfo(i, minIndex, ranges[i], domains[minIndex]);
            res.push(finalInfo);
        }
        return res;
    };
    Compressor.prototype.getDiff = function (r, d, info) {
        var diff = 0;
        var coeff = d.width / r.width;
        for (var x = 0; x < r.width; ++x) {
            for (var y = 0; y < r.height; ++y) {
                var rPxl = r.getPixel(x, y).r;
                var dPxl = d.getPixel(x, y, coeff).r * info.s + info.o;
                diff += (rPxl - dPxl) * (rPxl - dPxl);
            }
        }
        diff = Math.sqrt(diff);
        return diff;
    };
    Compressor.prototype.getInfo = function (i, j, range, domain) {
        var avgR = this.getAverage(range);
        var avgD = this.getAverage(domain);
        var alpha = this.getAlpha(range, domain, avgR, avgD);
        var betha = this.getBetha(domain, avgD);
        var s = alpha / betha;
        var o = avgR - s * avgD;
        return new CompInfo(i, j, s, o);
    };
    Compressor.prototype.getAverage = function (ent) {
        var avg = 0;
        for (var x = 0; x < ent.width; ++x) {
            for (var y = 0; y < ent.height; ++y) {
                avg += ent.getPixel(x, y).r;
            }
        }
        avg /= ent.width * ent.height;
        return avg;
    };
    Compressor.prototype.getAlpha = function (r, d, avgR, avgD) {
        var res = 0;
        var coeff = d.width / r.width;
        for (var x = 0; x < r.width; ++x) {
            for (var y = 0; y < r.height; ++y) {
                var rPxl = r.getPixel(x, y).r;
                var dPxl = d.getPixel(x, y, coeff).r;
                res += (rPxl - avgR) * (dPxl - avgD);
            }
        }
        return res;
    };
    Compressor.prototype.getBetha = function (d, avgD) {
        var res = 0;
        for (var x = 0; x < d.width; ++x) {
            for (var y = 0; y < d.height; ++y) {
                var dPxl = d.getPixel(x, y).r;
                res += (dPxl - avgD) * (dPxl - avgD);
            }
        }
        return res;
    };
    return Compressor;
}());
//# sourceMappingURL=Compressor.js.map