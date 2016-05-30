class EntityFactory {
    private innerSize: number;

    constructor(size: number) {
        this.innerSize = size;
    }

    public build(image: Bitmap, coeff: number): Entity[] {
        let res = new Array<Entity>();
        let size = this.innerSize * coeff;
        let n = image.width / size;
        let m = n;

        let pnt = new Point(0, 0);
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < m; ++j) {
                pnt = new Point(size * i, size * j);
                res.push(new Entity(image, pnt, size, size));
            }
        }

        return res;
    }
}
