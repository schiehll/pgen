import should from 'should';
import Genetic from '../src/Genetic';
import Registry from '../src/Registry';
import * as latino from '../src/names/latino';
import * as russian from '../src/names/russian';

describe('Registry', () => {
  before(() => {
    let gen = new Genetic({seed: 0});
    global.reg = new Registry(gen);
  });

  it('should have a Genetic instance', () => {
    should.exist(reg.genetic);
    reg.genetic.should.be.an.instanceof(Genetic);
  });

  describe('firstName', () => {
    it('should return a string', () => {
      let name = reg.firstName('brazilian', 'M');
      name.should.be.an.String();
    });

    it('should return a name based in the given country and gender', () => {
      let country = 'russian';
      let name = reg.firstName(country, 'M');
      name.should.be.an.String();
      name.should.be.oneOf(russian.maleFirstNames);

      name = reg.firstName(country, 'F');
      name.should.be.an.String();
      name.should.be.oneOf(russian.femaleFirstNames);

      country = 'latino';
      name = reg.firstName(country, 'M');
      name.should.be.an.String();
      name.should.be.oneOf(latino.maleFirstNames);

      name = reg.firstName(country, 'F');
      name.should.be.an.String();
      name.should.be.oneOf(latino.femaleFirstNames);
    });
  });

  describe('lastName', () => {
    it('should return a string', () => {
      let name = reg.lastName('brazilian');
      name.should.be.an.String();
    });

    it('should return a name based in the given country', () => {
      let country = 'russian';
      let name = reg.lastName(country, 'M');
      name.should.be.an.String();
      name.should.be.oneOf(russian.lastNames);

      country = 'latino';
      name = reg.lastName(country, 'F');
      name.should.be.an.String();
      name.should.be.oneOf(latino.lastNames);
    });
  });
});