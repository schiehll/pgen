import Rand from 'random-js';
import Countries from './Countries';
import Colors from './Colors';

type Options = {
  seed: number,
  minAge?: number,
  maxAge?: number,
  age?: number,
  country?: string,
  gender?: string,
  handed?: string
}

export default class Genetic {
  constructor(options: Options) : void {
    this.options = options;
    this.engine = Rand.engines.mt19937().seed(this.options.seed);
    this.random = new Rand(this.engine);
    this.colors = Colors;
    this.countries = new Countries();
    this.genders = {MALE: 'M', FEMALE: 'F'};
    this.hand = {LEFT: 'LEFT', RIGHT: 'RIGHT', TWO: 'TWO'};
  }

  _choose(arr: Array, start: number = 0, end: number = arr.length - 1) : any {
    if(arr.length > end 
      && arr.length > start
      && start > -1
      && end > -1){
      return arr[this.random.integer(start, end)];
    }

    return arr[this.random.integer(0, arr.length - 1)];
  }

  _getEthnicity(skinColor: string) : string {
    if(this.colors.skin.indexOf(skinColor) > 4 
      && this.colors.skin.indexOf(skinColor) < 10){
      return this.countries.ethnicity.MEDIUM;
    }
    
    if(this.colors.skin.indexOf(skinColor) > 9){
      return this.countries.ethnicity.DARK;
    }

    return this.countries.ethnicity.LIGHT;
  }

  age() : number { 
    if(this.options.age){
      return this.options.age;
    }
    
    let minAge = this.options.minAge || 15; 
    let maxAge = this.options.maxAge || 70; 
    return this.random.integer(minAge, maxAge);
  }

  handed() : string {  
    if(this.options.handed){
      return this.options.handed;
    }

    return this._choose([this.hand.LEFT, this.hand.RIGHT, this.hand.TWO]);
  }

  gender() : string { 
    if(this.options.gender){
      return this.options.gender;
    }

    return this.random.bool() ? this.genders.MALE : this.genders.FEMALE;
  }

  country() : Object {
    let country = this._choose(this.countries.all);
    
    if(this.options.country){
      this.countries.all.forEach((c) => {
        if(c.initials === this.options.country){
          country = c;
          return;
        }
      });
    }

    return country;
  }

  skinColor(country: Object) : string {
    switch(country.ethnicity){
      case this.countries.ethnicity.LIGHT:
        return this._choose(this.colors.skin, 0, 4);
      case this.countries.ethnicity.MEDIUM:
        return this._choose(this.colors.skin, 5, 9);
      case this.countries.ethnicity.DARK:
        return this._choose(this.colors.skin, 10, 14);
      default:
        return this._choose(this.colors.skin);
    }
  }

  eyesColor(country: Object, skinColor: string) : string {
    let ethnicity = country.ethnicity;
    if(country.ethnicity == this.countries.ethnicity.ALL){
      ethnicity = this._getEthnicity(skinColor);
    }

    if(ethnicity == this.countries.ethnicity.DARK
      || ethnicity == this.countries.ethnicity.MEDIUM
      || this.countries.isAsian(country.initials)){
      return this.colors.eyes[0];
    }

    return this._choose(this.colors.eyes);
  }

  hairColor(country: Object, skinColor: string) : string {
    let ethnicity = country.ethnicity;
    if(country.ethnicity == this.countries.ethnicity.ALL){
      ethnicity = this._getEthnicity(skinColor);
    }

    if(ethnicity == this.countries.ethnicity.DARK || this.countries.isAsian(country.initials)){
      return this.colors.hair[0];
    }

    //5% chance to be a ginger
    if(ethnicity == this.countries.ethnicity.LIGHT && this.random.bool(0.05)){
      return this.colors.hair[this.colors.hair.length - 1];
    }

    if(ethnicity == this.countries.ethnicity.LIGHT){
      return this._choose(this.colors.hair, 0, this.colors.hair.length - 2);
    }

    return this._choose(this.colors.hair, 0, this.colors.hair.length - 3);
  }
}