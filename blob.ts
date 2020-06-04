class Blob {
  private data: Buffer;
  private _oid: string;
  constructor(data: Buffer) {
    this.data = data;
  }
  type(): string {
    return "blob";
  }
  toBuffer(): Buffer {
    return this.data;
  }
  set oid(s: string) {
    this._oid = s;
  }
  get oid(): string {
    return this._oid;
  }
}

export default Blob;
