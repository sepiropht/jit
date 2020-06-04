import * as strftime from "strftime";

export class Author {
  private name: string;
  private email: string;
  private time: Date;
  constructor(name: string, email: string, time: Date) {
    this.name = name;
    this.email = email;
    this.time = time;
  }
  toString = (): String => {
    const timeStamp = strftime("%s %z", this.time);
    return `${this.name} <${this.email}> ${timeStamp}`;
  };
}
