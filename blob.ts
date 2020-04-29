
class Blob {
  private data : string
  private _oid: string
  constructor(data: string) {
    this.data = data;
  }
  type(): string {
    return "blob";
  }
  toString() : string {
      return this.data
  }
  set oid(s: string) {
      this._oid = s
  }
  get oid(): string {
      return this._oid
  }
}

export default Blob;
