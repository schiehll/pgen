import should from 'should';
import Genetic from '../src/Genetic';
import Registry from '../src/Registry';

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
  });

  describe('lastName', () => {
    it('should return a string', () => {
      let name = reg.lastName('brazilian');
      name.should.be.an.String();
    });
  });
});