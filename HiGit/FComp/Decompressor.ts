class Decompressor {
    private factory: EntityFactory;
    private context: CanvasRenderingContext2D;

    constructor(fact: EntityFactory, ctx: CanvasRenderingContext2D) {
        this.factory = fact;
        this.context = ctx;
    }

    public decompress() {
        let imgData = this.context.getImageData(0, 0, 512, 512);
        let bmp = new Bitmap(imgData);

        let ranges = this.factory.build(bmp, 1);
        let domains = this.factory.build(bmp, 2);

        let info = GLOBALINFO.slice(0);

        this.doStep(ranges, domains, info, bmp);
    }

    private doStep(ranges: Entity[], domains: Entity[], info: CompInfo[], bmp: Bitmap) {
        let newBmp = new Bitmap(bmp.toImageData());

        for (let i = 0; i < info.length; ++i) {
            let indR = info[i].range;
            let range = ranges[indR];
            let indD = info[i].domain;
            let domain = domains[indD];

            this.updateMap(newBmp, range, domain, info[i]);
        }

        this.context.putImageData(newBmp.toImageData(), 0, 0);
    }

    private updateMap(newBmp: Bitmap, range: Entity, domain: Entity, inf: CompInfo) {
        let coeff = domain.width / range.width;

        for (let x = 0; x < range.width; ++x) {
            for (let y = 0; y < range.height; ++y) {
                let color = domain.getPixel(x, y, coeff).r;
                color = color * inf.s + inf.o;
                
                let pxl = new Pixel(color, color, color, 255);

                newBmp.setPixel(pxl, range.start.x + x, range.start.y + y);
            }
        }
    }
}
