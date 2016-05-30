class Entity {
    private _parent: Bitmap;
    private _start: Point;
    private _width: number;
    private _height: number;

    constructor(image: Bitmap, start: Point, width: number, height: number) {
        this._start = start;
        this._width = width;
        this._height = height;
        this._parent = image;
    }

    get parent() {
        return this._parent;
    }
    get start() {
        return this._start;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    public getPixel(x: number, y: number, sizeCoeff?: number): Pixel {
        if (!sizeCoeff) {
            return this._parent.getPixel(this.start.x + x, this.start.y + y);
        }
        else {
            let avg = 0;
            for (let i = 0; i < sizeCoeff; ++i) {
                for (let j = 0; j < sizeCoeff; ++j) {
                    avg += this._parent.getPixel(this.start.x + x + i, this.start.y + y + j).r;
                }
            }
            avg /= sizeCoeff * sizeCoeff;

            return new Pixel(avg, avg, avg, 255);
        }
    }
}
