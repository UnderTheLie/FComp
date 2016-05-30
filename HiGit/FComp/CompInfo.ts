class CompInfo {
    private _range: number;
    private _domain: number;
    private _s: number;
    private _o: number;

    constructor(r: number, d: number, s: number, o: number) {
        this._range = r;
        this._domain = d;
        this._s = s;
        this._o = o;
    }

    get range(): number {
        return this._range;
    }
    get domain(): number {
        return this._domain;
    }
    get s(): number {
        return this._s;
    }
    get o(): number {
        return this._o;
    }
}
