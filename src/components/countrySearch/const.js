const populationCount = {
  ONE_MILLION: "< 1 M",
  FIVE_MILLION: "< 5 M",
  TEN_MILLION: "< 10 M",
};

const populationFilterOptions = [
  {
    value: 1000000,
    label: populationCount.ONE_MILLION,
  },
  { value: 5000000, label: populationCount.FIVE_MILLION },
  { value: 10000000, label: populationCount.TEN_MILLION },
];

const countryColumns = {
  CODE: "code",
  CAPITAL: "capital",
  COUNTRY_NAME: "countryName",
  PHONE: "phone",
  POPULATION: "population",
  EMBLEM: "emblem",
  FLAG: "flag",
};
const countryListColumnMapper = {
  [countryColumns.COUNTRY_NAME]: "Country Name",
  [countryColumns.CODE]: "Code",
  [countryColumns.CAPITAL]: "Capital",
  [countryColumns.PHONE]: "Ph Code",
  [countryColumns.POPULATION]: "Population",
  [countryColumns.FLAG]: "Flag",
  [countryColumns.EMBLEM]: "Emblem",
};
export {
  populationCount,
  populationFilterOptions,
  countryListColumnMapper,
  countryColumns,
};
