import React, {Component} from 'react';

export default class Avatar extends Component {
  constructor(props: Object) : void {
    super(props);
    this.skinColor = props.genetic.skinColor(props.country);
    this.eyesColor = props.genetic.eyesColor(props.country, this.skinColor);
    this.hairColor = props.genetic.hairColor(props.country, this.skinColor);

    this.style = {
      backgroundColor: this.props.bgColor
    };
  }

  _setSkinColor(skin){
    skin.selectAll('[fill="#ffcc99"]').attr({
      fill: this.skinColor
    });
  }

  _setEyesColor(eyes){
    eyes.selectAll('path').attr({
      fill: this.eyesColor
    });
  }

  _setHairColor(hair){
    hair.selectAll('path').attr({
      fill: this.hairColor
    });
  }

  _setBeardColor(beard){
    beard.selectAll('path').attr({
      fill: this.hairColor
    });
  }

  _setEyebrowsColor(eyebrows){
    eyebrows.selectAll('path').attr({
      fill: this.hairColor
    });
  }

  _setClothColor(cloth){
    cloth.select(`#${this.props.gender}_cloth_base`).attr({
      fill: '#333333'
    });
  }

  _setEyesSize(eyes){
    let size = this.props.genetic.random.integer(6, 10) / 10;
    eyes.select('#right').transform(`s${size}`);
    eyes.select('#left').transform(`s${size}`);
  }

  _setAsianEyes(eyes){
    eyes.select('#right').transform(`r-60, s0.6`);
    eyes.select('#left').transform(`r60, s0.6`);
  }

  componentDidMount(){
    let Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
    let canvas = Snap(this.svg);

    Snap.load(this.props.svg, (svg) => {
      let skin = svg.select('#base');
      this._setSkinColor(skin);

      let eyes = svg.select('#eyes');
      this._setEyesColor(eyes);
      
      if(this.props.genetic.countries.isAsian(this.props.country.initials)){
        this._setAsianEyes(eyes);
      }
      else{
        this._setEyesSize(eyes);
      }

      let hair = null;
      let bald = false;
      let hairs = svg.selectAll(`g[id^="${this.props.gender}_hair_"`);
      //10% chance to be bald if male
      if(this.props.gender == this.props.genetic.genders.MALE && this.props.genetic.random.bool(0.1)){
        bald = true;
      }

      if(!bald) {
        hair = svg.select(`#${this.props.gender}_hair_${this.props.genetic.random.integer(1, hairs.length)}`);
      }

      if(hair !== null){
        this._setHairColor(hair);
      }

      let cloth = svg.select(`#${this.props.gender}_cloth_1`);
      this._setClothColor(cloth);

      let mouths = svg.selectAll(`g[id^="mouth_"`);

      let scale : number = this.props.size / 250;

      canvas.append(svg.selectAll('filter'));
      canvas.append(skin.transform(`s${scale}`));
      canvas.append(cloth.transform(`s${scale}`));
      canvas.append(eyes.transform(`s${scale}`));
      canvas.append(svg.select(`#mouth_${this.props.genetic.random.integer(1, mouths.length)}`).transform(`s${scale}`));
      if(hair !== null){
        canvas.append(hair.transform(`s${scale}`));
      }

      if(this.props.gender == this.props.genetic.genders.MALE){
        let allEyebrows = svg.selectAll(`g[id^="eyebrows_"`);
        let eyebrows = svg.select(`#eyebrows_${this.props.genetic.random.integer(1, allEyebrows.length)}`);
        this._setEyebrowsColor(eyebrows);
        canvas.append(eyebrows.transform(`s${scale}`));
      }

      //50% chance to have a bear if male
      if(this.props.gender == this.props.genetic.genders.MALE && this.props.genetic.random.bool(0.5)){
        let beards = svg.selectAll(`g[id^="beard_"`);
        let beard = svg.select(`#beard_${this.props.genetic.random.integer(1, beards.length)}`);
        this._setBeardColor(beard);
        canvas.append(beard.transform(`s${scale}`));
      }
    });
  }

  render() : Object {
    return(
      <svg style={this.style} ref={svg => this.svg = svg} width={this.props.size} height={this.props.size}></svg>
    );
  }
}