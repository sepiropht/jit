class Entry {
  private _oid: string;
  private _name: string;
  private _mode: number;

  constructor(name: string, oid: string, mode: number) {
    this._oid = oid;
    this._name = name;
    this._mode = mode;
  }

  set oid(oid: string) {
    this._oid = oid;
  }
  get oid(): string {
    return this._oid;
  }
  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  get mode(): string {
    return this._mode.toString();
  }
}

export default Entry;
