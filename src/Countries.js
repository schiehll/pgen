export default class Countries {
  constructor() : void {
    this.ethnicity = {
      LIGHT: 'LIGHT',
      MEDIUM: 'MEDIUM',
      DARK: 'DARK',
      ALL: 'ALL'
    }

    this.names = {
      BRA: 'brazilian',
      CHN: 'chinese',
      JPN: 'japanese',
      USA: 'american',
      RUS: 'russian',
      SPANISH: 'spanish',
      LATINO: 'latino'
    }

    this.all = [
      {
        initials: 'ARG',
        ethnicity: this.ethnicity.LIGHT,
        names: this.names.LATINO
      },
      {
        initials: 'BRA',
        ethnicity: this.ethnicity.ALL,
        names: this.names.BRA
      },
      {
        initials: 'COL',
        ethnicity: this.ethnicity.MEDIUM,
        names: this.names.LATINO
      },
      {
        initials: 'CHN',
        ethnicity: this.ethnicity.LIGHT,
        names: this.names.LATINO
      },
      {
        initials: 'JPN',
        ethnicity: this.ethnicity.LIGHT,
        names: this.names.LATINO
      },
      {
        initials: 'USA',
        ethnicity: this.ethnicity.ALL,
        names: this.names.LATINO
      },
      {
        initials: 'RUS',
        ethnicity: this.ethnicity.LIGHT,
        names: this.names.LATINO
      }
    ];

    this.asianCountries = [
      'CHN', 'JPN'
    ];
  }

  isAsian(country: string) : bool {
    return this.asianCountries.indexOf(country) !== -1;
  }
}