import React from 'react';
import should from 'should';
import {shallow} from 'enzyme';
import Avatar from '../src/Avatar';
import Genetic from '../src/Genetic';
import PersonGenerator from '../src/PersonGenerator';
import avatarSvg from '../src/assets/img/avatar.svg';

describe('<Avatar />', () => {
  before(() => {
    let avatarOptions = {
      svg: avatarSvg,
      size: 250,
      bgColor: '#cccccc'
    }
    let pg = new PersonGenerator(avatarOptions);
    global.aProps = pg._generateOptions();
  });

  it('should receive props', () => {
    let avatar = shallow(<Avatar {...aProps} />);
    should(avatar.instance().props).containEql(aProps);
  });
});