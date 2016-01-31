import should from 'should';
import Countries from '../src/Countries';

describe('Countries', () => {
  before(() => {
    global.countries = new Countries();
  });

  it('should have an array of contries named "all"', () => {
    should.exist(countries.all);
    countries.all.should.be.an.Array();
  });

  it('should have objects with the properties "initials" and "ethnicity" on each position of the array "all"', () => {
    countries.all.forEach((country) => {
      country.should.have.property('initials');
      country.should.have.property('ethnicity');
    });
  });

  it('should have an array of asian contries named "asianCountries"', () => {
    should.exist(countries.asianCountries);
    countries.asianCountries.should.be.an.Array();
  });

  describe('isAsian', () => {
    it('should return true if "asianCountries" contains the argument passed', () => {
      countries.asianCountries.push('TEST_TRUE');
      let result = countries.isAsian('TEST_TRUE');
      result.should.be.ok();
    });

    it('should return false if "asianCountries" does not contains the argument passed', () => {
      let result = countries.isAsian('TEST_FALSE');
      result.should.be.not.ok();
    });
  });
});