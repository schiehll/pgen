import Rand from 'random-js';

export default class Registry {
  constructor(){
    this.engine = Rand.engines.mt19937().autoSeed();
    this.random = new Rand(this.engine);
  }

  name(country: string) : Object {
    let completeName = {};
    require.ensure(['./names/brazilian', './names/latino'], (require) => {
      let names = require('./names/' + country);
      console.log(names);
      
      completeName.first = names.maleFirstNames[this.random.integer(0, names.maleFirstNames.length - 1)];
      completeName.last = names.maleLastNames[this.random.integer(0, names.maleLastNames.length - 1)];
    });
    
    return completeName;
  }
}