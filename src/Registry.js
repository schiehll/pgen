import Genetic from './Genetic';
import * as brazilian from './names/brazilian';
import * as latino from './names/latino';
import * as russian from './names/russian';

export default class Registry {
  constructor(genetic: Genetic){
    this.genetic = genetic;
    this.allNames = {brazilian, latino, russian};
  }

  firstName(country: string, gender: string) : string {
    let names = this.allNames[country];
    
    if(gender === this.genetic.genders.MALE){
      return names.maleFirstNames[this.genetic.random.integer(0, names.maleFirstNames.length - 1)];
    }

    return names.femaleFirstNames[this.genetic.random.integer(0, names.femaleFirstNames.length - 1)];
  }

  lastName(country: string) : string {
    let names = this.allNames[country];

    return names.lastNames[this.genetic.random.integer(0, names.lastNames.length - 1)];
  }
}