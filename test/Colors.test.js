import should from 'should';
import Colors from '../src/Colors';

describe('Colors', () => {
  it('should have a skin color array with 15 elements', () => {
    Colors.should.have.property('skin').which.is.an.Array().with.lengthOf(15);
  });

  it('should have an eyes color array', () => {
    Colors.should.have.property('eyes').which.is.an.Array();
  });

  it('should have a hair color array', () => {
    Colors.should.have.property('hair').which.is.an.Array();
  });
});