var EntityFactory = (function () {
    function EntityFactory(size) {
        this.innerSize = size;
    }
    EntityFactory.prototype.build = function (image, coeff) {
        var res = new Array();
        var size = this.innerSize * coeff;
        var n = image.width / size;
        var m = n;
        var pnt = new Point(0, 0);
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < m; ++j) {
                pnt = new Point(size * i, size * j);
                res.push(new Entity(image, pnt, size, size));
            }
        }
        return res;
    };
    return EntityFactory;
}());
//# sourceMappingURL=EntityFactory.js.map