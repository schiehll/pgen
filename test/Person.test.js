import React from 'react';
import should from 'should';
import {shallow} from 'enzyme';
import Person from '../src/Person';
import Avatar from '../src/Avatar';
import Genetic from '../src/Genetic';
import PersonGenerator from '../src/PersonGenerator';
import avatarSvg from '../src/assets/img/avatar.svg';

describe('Person', () => {
  before(() => {
    let avatarOptions = {
      svg: avatarSvg,
      size: 250,
      bgColor: '#cccccc'
    }
    let pg = new PersonGenerator(avatarOptions);
    global.aProps = pg._generateOptions();
  });

  it('should accept infos', () => {
    let infos = {
      firstName: 'First',
      lastName: 'Last',
      age: 26,
      country: 'BRA',
      gender: 'M',
      handed: 'RIGHT',
      avatar: shallow(<Avatar {...aProps} />)
    };

    let person = new Person(infos);
    person.infos.should.eql(infos);
  });

  describe('name', () => {
    it('should return the firstName and the lastName in one string', () => {
      let infos = {
        firstName: 'First',
        lastName: 'Last',
        age: 26,
        country: 'BRA',
        gender: 'M',
        handed: 'RIGHT',
        avatar: shallow(<Avatar {...aProps} />)
      };

      let person = new Person(infos);
      let name = person.name();
      name.should.be.exactly(`${person.infos.firstName} ${person.infos.lastName}`);
    });
  });
});