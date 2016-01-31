export default class Countries {
  constructor() : void {
    this.ethnicity = {
      LIGHT: 'LIGHT',
      MEDIUM: 'MEDIUM',
      DARK: 'DARK',
      ALL: 'ALL'
    }

    this.all = [
      {
        initials: 'ARG',
        ethnicity: this.ethnicity.LIGHT
      },
      {
        initials: 'BRA',
        ethnicity: this.ethnicity.ALL
      },
      {
        initials: 'CHN',
        ethnicity: this.ethnicity.LIGHT
      },
      {
        initials: 'JPN',
        ethnicity: this.ethnicity.LIGHT
      },
      {
        initials: 'USA',
        ethnicity: this.ethnicity.ALL
      },
      {
        initials: 'RUS',
        ethnicity: this.ethnicity.LIGHT
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