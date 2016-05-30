class Bitmap {
    private data: Uint8ClampedArray;
    private _width: number;
    private _height: number;

    constructor(image: ImageData) {
        this.data = image.data;
        this._width = image.width;
        this._height = image.height;
    }

    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }

    public getPixel(x: number, y: number): Pixel {
        let index = (y * this.width + x) * 4;

        let r = this.data[index];
        let g = this.data[++index];
        let b = this.data[++index];
        let a = this.data[++index];

        return new Pixel(r, g, b, a);
    }

    public setPixel(pxl: Pixel, x: number, y: number): void {
        let index = (y * this.width + x) * 4;

        this.data[index] = pxl.r;
        this.data[++index] = pxl.g;
        this.data[++index] = pxl.b;
        this.data[++index] = pxl.a;
    }

    public toImageData(): ImageData {
        return new ImageData(this.data, this._width, this._height);
    }

    public toGrayscale(): void {
        let pxl = new Pixel(0, 0, 0, 0);
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                pxl = this.getPixel(x, y).toGrayscale();
                this.setPixel(pxl, x, y);
            }
        }
    }
}
