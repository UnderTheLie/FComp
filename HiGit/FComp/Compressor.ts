class Compressor {
    private factory: EntityFactory;
    private context: CanvasRenderingContext2D;

    constructor(fact: EntityFactory, ctx: CanvasRenderingContext2D) {
        this.factory = fact;
        this.context = ctx;
    }

    public compress() {
        let imgData = this.context.getImageData(0, 0, 512, 512);
        let bmp = new Bitmap(imgData);

        let ranges = this.factory.build(bmp, 1);
        let domains = this.factory.build(bmp, 2);

        let info = this.buildInfo(ranges, domains);

        GLOBALINFO = info.slice(0);
    }

    private buildInfo(ranges: Entity[], domains: Entity[]): CompInfo[] {
        let res = new Array<CompInfo>();

        for (let i = 0; i < ranges.length; ++i) {
            let minDiff = Infinity;
            let minIndex = -1;

            for (let j = 0; j < domains.length; ++j) {
                let info = this.getInfo(i, j, ranges[i], domains[j]);
                let diff = this.getDiff(ranges[i], domains[j], info);

                if (diff < minDiff) {
                    minDiff = diff;
                    minIndex = j;
                }
            }

            let finalInfo = this.getInfo(i, minIndex, ranges[i], domains[minIndex]);
            res.push(finalInfo);
        }

        return res;
    }

    private getDiff(r: Entity, d: Entity, info: CompInfo): number {
        let diff = 0;
        let coeff = d.width / r.width;

        for (let x = 0; x < r.width; ++x) {
            for (let y = 0; y < r.height; ++y) {
                let rPxl = r.getPixel(x, y).r;
                let dPxl = d.getPixel(x, y, coeff).r * info.s + info.o;
                diff += (rPxl - dPxl) * (rPxl - dPxl);
            }
        }
        diff = Math.sqrt(diff);

        return diff;
    }

    private getInfo(i: number, j: number, range: Entity, domain: Entity): CompInfo {
        let avgR = this.getAverage(range);
        let avgD = this.getAverage(domain);
        let alpha = this.getAlpha(range, domain, avgR, avgD);
        let betha = this.getBetha(domain, avgD);
        let s = alpha / betha;
        let o = avgR - s * avgD;

        return new CompInfo(i, j, s, o);
    }

    private getAverage(ent: Entity): number {
        let avg = 0;

        for (let x = 0; x < ent.width; ++x) {
            for (let y = 0; y < ent.height; ++y) {
                avg += ent.getPixel(x, y).r;
            }
        }

        avg /= ent.width * ent.height;

        return avg;
    }

    private getAlpha(r: Entity, d: Entity, avgR: number, avgD: number): number {
        let res = 0;
        let coeff = d.width / r.width;

        for (let x = 0; x < r.width; ++x) {
            for (let y = 0; y < r.height; ++y) {
                let rPxl = r.getPixel(x, y).r;
                let dPxl = d.getPixel(x, y, coeff).r;
                res += (rPxl - avgR) * (dPxl - avgD);
            }
        }

        return res;
    }

    private getBetha(d: Entity, avgD: number): number {
        let res = 0;

        for (let x = 0; x < d.width; ++x) {
            for (let y = 0; y < d.height; ++y) {
                let dPxl = d.getPixel(x, y).r;
                res += (dPxl - avgD) * (dPxl - avgD);
            }
        }

        return res;
    }
}
