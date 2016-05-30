class Pixel {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this._r = red;
        this._g = green;
        this._b = blue;
        this._a = alpha;
    }

    get r(): number {
        return this._r;
    }
    get g(): number {
        return this._g;
    }
    get b(): number {
        return this._b;
    }
    get a(): number {
        return this._a;
    }

    public toGrayscale(): Pixel {
        let avg = 0.299 * this._r + 0.587 * this._g + 0.114 * this._b;
        this._r = avg;
        this._g = avg;
        this._b = avg;

        return this;
    }
}
