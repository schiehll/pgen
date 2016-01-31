import should from 'should';
import Genetic from '../src/Genetic';
import Colors from '../src/Colors';
import Countries from '../src/Countries';

describe('Genetic', () => {
  before(() => {
    let options = {seed: 0, minAge: 18, maxAge: 33};
    global.g = new Genetic(options);
  });

  it('should accept an Options Object', () => {
    let options = {seed: 0, minAge: 18, maxAge: 33};
    let genetic = new Genetic(options);
    genetic.options.should.be.exactly(options);
  });

  it('should have a Colors instance named "colors"', () => {
    should.exist(g.colors)
    g.colors.should.be.exactly(Colors);
  });

  it('should have a Countries instance named "countries"', () => {
    should.exist(g.countries);
    g.countries.should.be.an.instanceof(Countries);
  });

  describe('_choose', () => {
    it('should return a random element of the Array received', () => {
      let arr = [0, 1, 2];
      let el = g._choose(arr);
      arr.should.containEql(el);
    });

    it('should return a random element of the Array received considering the given start index', () => {
      let arr = [0, 1, 2];
      let start = 1;
      let el = g._choose(arr, start);
      let index = arr.indexOf(el);
      should(index >= start).be.ok();
      should(index < arr.length && index >= 0).be.ok();
    });

    it('should return a random element of the Array received considering the given end index', () => {
      let arr = [0, 1, 2];
      let start = 0;
      let end = 1;
      let el = g._choose(arr, start, end);
      let index = arr.indexOf(el);
      should(index <= end).be.ok();
      should(index < arr.length && index >= 0).be.ok();
    });
  });

  describe('_getEthnicity', () => {
    it('should return "light" if the given skin color have index smaller then 5', () => {
      let index = 4;
      let skin = g.colors.skin[index];
      let ethnicity = g._getEthnicity(skin);
      ethnicity.should.be.exactly(g.countries.ethnicity.LIGHT);
    });

    it('should return "medium" if the given skin color have index between 5 and 9', () => {
      let index = 9;
      let skin = g.colors.skin[index];
      let ethnicity = g._getEthnicity(skin);
      ethnicity.should.be.exactly(g.countries.ethnicity.MEDIUM);
    });

    it('should return "dark" if the given skin color have index between 10 and 14', () => {
      let index = 11;
      let skin = g.colors.skin[index];
      let ethnicity = g._getEthnicity(skin);
      ethnicity.should.be.exactly(g.countries.ethnicity.DARK);
    });
  });

  describe('age', () => {
    it('should return a random age', () => {
      let age = g.age();
      age.should.be.an.Number();
    });

    it('should return a age between the given limit', () => {
      let age = g.age();
      should(age >= g.options.minAge && age <= g.options.maxAge).be.ok();
    });

    it('should return the age accepted in the constructor if any', () => {
      let options = {seed: 0, age: 20};
      let gen = new Genetic(options);
      let age = gen.age();
      age.should.be.exactly(options.age);
    });
  });

  describe('handed', () => {
    it('should return a random handed string ("LEFT", "RIGHT" or "TWO")', () => {
      let handed = g.handed();
      handed.should.be.an.String();
      handed.should.be.oneOf('LEFT', 'RIGHT', 'TWO');
    });

     it('should return the handed accepted in the constructor if any', () => {
      let options = {seed: 0, handed: g.hand.LEFT};
      let gen = new Genetic(options);
      let handed = gen.handed();
      handed.should.be.exactly(options.handed);
    });
  });

  describe('gender', () => {
    it('should return a random gender ("M" or "F")', () => {
      let gender = g.gender();
      gender.should.be.an.String();
      gender.should.be.oneOf(g.genders.MALE, g.genders.FEMALE);
    });

    it('should return the gender accepted in the constructor if any', () => {
      let options = {seed: 0, gender: 'M'};
      let gen = new Genetic(options);
      let gender = gen.gender();
      gender.should.be.an.String();
      gender.should.be.exactly(options.gender);
    });
  });

  describe('country', () => {
    it('should return a random Country Object', () => {
      let country = g.country();
      country.should.be.an.Object();
      country.should.have.property('initials');
      country.should.have.property('ethnicity');
    });

    it('should return the Country Object that match the accepted country initials if any', () => {
      let options = {seed: 0, country: 'JPN'};
      let gen = new Genetic(options);
      let country = gen.country();
      country.should.be.an.Object();
      country.should.have.property('initials');
      country.should.have.property('ethnicity');
      country.initials.should.be.exactly(options.country);
    });
  });

  describe('skinColor', () => {
    it('should return a skin color', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.ALL};
      let skin = g.skinColor(country);
      skin.should.be.oneOf(g.colors.skin);
    });

    it('should return a "light" color if ethnicity is equal "light"', () => {
      let country = {initials: 'ARG', ethnicity: g.countries.ethnicity.LIGHT};
      let skin = g.skinColor(country);
      let lightColors = g.colors.skin.filter((color, index) => {
        return index < 5;
      });
      skin.should.be.oneOf(lightColors);
    });

    it('should return a "medium" color if ethnicity is equal "medium"', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.MEDIUM};
      let skin = g.skinColor(country);
      let mediumColors = g.colors.skin.filter((color, index) => {
        return index > 4 && index < 10;
      });
      skin.should.be.oneOf(mediumColors);
    });

    it('should return a "dark" color if ethnicity is equal "dark"', () => {
      let country = {initials: 'NIG', ethnicity: g.countries.ethnicity.DARK};
      let skin = g.skinColor(country);
      let darkColors = g.colors.skin.filter((color, index) => {
        return index > 9;
      });
      skin.should.be.oneOf(darkColors);
    });
  });

  describe('eyesColor', () => {
    it('should return an eye color', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.ALL};
      let skin = g.skinColor(country);
      let eyes = g.eyesColor(country, skin);
      eyes.should.be.oneOf(g.colors.eyes);
    });

    it('should return the first eye color if ethnicity is equal medium', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.MEDIUM};
      let skin = g.skinColor(country);
      let eyes = g.eyesColor(country, skin);
      eyes.should.be.eql(g.colors.eyes[0]);

      country = {initials: 'BRA', ethnicity: g.countries.ethnicity.ALL};
      eyes = g.eyesColor(country, skin);
      eyes.should.be.eql(g.colors.eyes[0]);
    });

    it('should return the first eye color if ethnicity is equal dark', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.DARK};
      let skin = g.skinColor(country);
      let eyes = g.eyesColor(country, skin);
      eyes.should.be.eql(g.colors.eyes[0]);

      country = {initials: 'BRA', ethnicity: g.countries.ethnicity.ALL};
      eyes = g.eyesColor(country, skin);
      eyes.should.be.eql(g.colors.eyes[0]);
    });

    it('should return the first eye color if country is asian', () => {
      let country = {initials: 'JPN', ethnicity: g.countries.ethnicity.LIGHT};
      let skin = g.skinColor(country);
      let eyes = g.eyesColor(country, skin);
      if(g.countries.isAsian(country.initials)){
        eyes.should.be.eql(g.colors.eyes[0]);
      }
      else{
        eyes.should.be.oneOf(g.colors.eyes);
      }
    });
  });

  describe('hairColor', () => {
    it('should return an hair color', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.ALL};
      let skin = g.skinColor(country);
      let hair = g.hairColor(country, skin);
      hair.should.be.oneOf(g.colors.hair);
    });

    it('should return the first hair color if ethnicity is equal dark', () => {
      let country = {initials: 'BRA', ethnicity: g.countries.ethnicity.DARK};
      let skin = g.skinColor(country);
      let hair = g.hairColor(country, skin);
      hair.should.be.eql(g.colors.hair[0]);
    });

    it('should return the first hair color if country is asian', () => {
      let country = {initials: 'JPN', ethnicity: g.countries.ethnicity.LIGHT};
      let skin = g.skinColor(country);
      let hair = g.hairColor(country, skin);
      if(g.countries.isAsian(country.initials)){
        hair.should.be.eql(g.colors.hair[0]);
      }
      else{
        hair.should.be.oneOf(g.colors.hair);
      }
    });
  });
});