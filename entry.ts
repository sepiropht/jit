class Entry {
    private _oid: string
    private _name: string
    constructor(name: string, oid: string) {
        this._oid = oid
        this._name = name
    }

    set oid(oid: string) {
        this._oid = oid
    }
    get oid(): string {
        return this._oid
    }
    set name(name: string) {
        this._name = name
    }
    get name(): string {
        return this._name
    }
}

export default Entry