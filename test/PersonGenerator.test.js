import React from 'react';
import should from 'should';
import {shallow} from 'enzyme';
import Avatar from '../src/Avatar';
import Person from '../src/Person';
import PersonGenerator from '../src/PersonGenerator';
import avatarSvg from '../src/assets/img/avatar.svg';

describe('PersonGenerator', () => {
  before(() => {
    let avatarOptions = {
      svg: avatarSvg,
      size: 250,
      bgColor: '#f1f1f1'
    }
    global.pg = new PersonGenerator(avatarOptions);
  });

  it('should accept AvatarOptions Object', () => {
    let avatarOptions = {
      svg: avatarSvg,
      size: 250,
      bgColor: '#f1f1f1'
    }
    let personGen = new PersonGenerator(avatarOptions);
    personGen.avatarOptions.should.be.exactly(avatarOptions);
  });

  describe('_generateOptions', () => {
    it('should return an Options Object', () => {
      let options = ['genetic', 'age', 'gender', 'country', 'handed'];
      let opts = pg._generateOptions();
      opts.should.have.properties(options);
    });
  });

  describe('make', () => {
    it('should generate a new Person', () => {
      let person1 = pg.make();
      person1.should.be.an.instanceof(Person);
    });

    it('should generate a random Person each time', () => {
      let person1 = pg.make();
      let person2 = pg.make();
      person1.infos.should.not.eql(person2.infos);
    });

    it('should generate same Person if receive the same seed', () => {
      let options = {seed: 0};
      let person1 = pg.make(options);
      let person2 = pg.make(options);
      person1.infos.should.eql(person2.infos);
    });
  });

  describe('makeAvatar', () => {
    it('should accept an Options object and spread it as props', () => {
      let options = pg._generateOptions();
      let avatar = shallow(pg.makeAvatar(options));
      should(avatar.instance().props).containEql(options);
    });

    it('should return an Avatar with a svg prop that contains the avatarSvg', () => {
      let avatar = shallow(pg.makeAvatar());
      should(avatar.instance()).be.an.instanceof(Avatar);
      should(avatar.instance().props).containEql({svg: avatarSvg});
    });
  });
});