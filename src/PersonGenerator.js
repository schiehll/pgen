import React from 'react';
import Rand from 'random-js';
import Person from './Person';
import Genetic from './Genetic';
import Registry from './Registry';
import Avatar from './Avatar';
import avatarSvg from './assets/img/avatar.svg';

type Options = {
  seed?: number,
  firstName?: string,
  lastName?: string,
  minAge?: number,
  maxAge?: number,
  age?: number,
  country?: string,
  gender?: string,
  handed?: string,
  avatar?: Object
}

type AvatarOptions = {
  svg?: string,
  size?: number,
  bgColor?: string
}

export default class PersonGenerator {
  constructor(avatarOptions: AvatarOptions) : void {
    if(!avatarOptions.svg){
      avatarOptions.svg = avatarSvg;
    }
    
    if(!avatarOptions.size){
      avatarOptions.size = 250;
    }

    if(!avatarOptions.bgColor){
      avatarOptions.bgColor = '#f1f1f1';
    }

    this.avatarOptions = avatarOptions;
  }

  _generateOptions(options?: Options) : Object {
    let opts = {};
    let seed = Rand.integer(1, 1000000)(Rand.engines.mt19937().autoSeed());
    
    if(!options){
      opts.seed = seed;
    }
    else{
      opts = options;
      if(!opts.seed){
        opts.seed = seed;
      }
    }

    let genetic = new Genetic(opts);

    let age = genetic.age();
    let gender = genetic.gender();
    let country = genetic.country();
    let handed = genetic.handed();

    return {genetic, age, gender, country, handed};
  }

  make(options?: Options) : Person {
    let opts = options ? this._generateOptions(options) : this._generateOptions();
    let registry = new Registry();

    return new Person({
      firstName: opts.firstName || registry.name(opts.country.initials).first,
      lastName: opts.lastName || registry.name(opts.country.initials).last,
      age: opts.age,
      country: opts.country.initials,
      gender: opts.gender,
      handed: opts.handed,
      avatar: opts.avatar || this.makeAvatar(opts)
    });
  }

  makeAvatar(options?: Object) : Object {
    let opts = {};

    if(!options){
      opts = this._generateOptions();
    }
    else{
      if(!options.genetic){
        opts = this._generateOptions(options);
      }
      else{
        opts = options;
      }
    }

    return <Avatar {...this.avatarOptions} {...opts} />
  }
}