type Infos = {
  firstName: string,
  lastName: string,
  age: number,
  country: string,
  gender: string,
  handed: string,
  avatar: Object
}

export default class Person {
  constructor(infos: Infos) : void {
    this.infos = infos;
  }

  name() : string {
    return `${this.infos.firstName} ${this.infos.lastName}`;
  }
}