
class Blob {
  private data : string
  oid: string
  constructor(data: string) {
    this.data = data;
  }
  type(): string {
    return "blob";
  }
  toString() : string {
      return this.data
  }
  setOid(s: string) {
      this.oid = s
  }
  getOid(): string {
      return this.oid
  }
}

export default Blob;
