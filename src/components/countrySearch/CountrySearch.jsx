import { useEffect, useState } from "react";
import "./CountrySearch.css";
import {
  populationFilterOptions,
  countryColumns,
  countryListColumnMapper,
} from "./const";
import { v4 as uuidv4 } from "uuid";
import { fetchCountryDetails } from "../../api/getCountryList";
import Table from "../Table/Table";

const CountrySearch = () => {
  const [showCountryList, setShowCountryList] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  const [selectedPopulationOption, setSelectedPopulationOption] =
    useState("-1");
  const [countryNameFilter, setCountryNameFilter] = useState("");

  const getFormattedCountryList = (countryList) => {
    return countryList.map(
      ({ abbreviation, capital, media, name, phone, population }) => ({
        [countryColumns.CODE]: abbreviation,
        [countryColumns.CAPITAL]: capital,
        [countryColumns.COUNTRY_NAME]: name,
        [countryColumns.PHONE]: phone,
        [countryColumns.POPULATION]: population,
        [countryColumns.EMBLEM]: media.emblem,
        [countryColumns.FLAG]: media.flag,
      })
    );
  };

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const response = await fetchCountryDetails();
        if (response.status === 200 && response?.data?.length > 0) {
          const formattedList = getFormattedCountryList(response.data);
          setCountryList(formattedList);
          setFilteredCountryList(formattedList);
        } else return;
      } catch (err) {
        console.log(err);
      }
    };

    getCountryDetails();
  }, []);

  useEffect(() => {
    let filteredList = countryList;

    if (countryNameFilter) {
      filteredList = filteredList.filter(({ countryName }) =>
        countryName.toLowerCase().includes(countryNameFilter.toLowerCase())
      );
    }

    if (selectedPopulationOption !== "-1") {
      filteredList = filteredList.filter(
        ({ population }) =>
          parseInt(population) < parseInt(selectedPopulationOption)
      );
    }

    setFilteredCountryList(filteredList);
  }, [countryNameFilter, selectedPopulationOption, countryList]);

  const handleCountryNameChange = ({ target }) => {
    setCountryNameFilter(target.value);
  };

  const handlePopulationOptionChange = ({ target }) => {
    setSelectedPopulationOption(target.value);
  };

  const clearAllFilters = () => {
    setCountryNameFilter("");
    setSelectedPopulationOption("-1");
    setFilteredCountryList(countryList);
  };

  return (
    <div className="country-search-container">
      <div className="title">Countries Info</div>
      <div className="table-controller">
        <div className="controller-options">
          <input
            type="text"
            placeholder="Enter country name..."
            className="input"
            value={countryNameFilter}
            onChange={handleCountryNameChange}
          />
          <select
            value={selectedPopulationOption}
            onChange={handlePopulationOptionChange}
          >
            <option value="-1" disabled>
              Population
            </option>
            {populationFilterOptions.map((el) => (
              <option key={uuidv4()} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
          <button className="clear" onClick={clearAllFilters}>
            Clear
          </button>
        </div>
        <button
          className="show-all-countries"
          disabled={showCountryList}
          onClick={() => setShowCountryList(true)}
        >
          Show all Countries
        </button>
      </div>
      <div className="table-content">
        {countryList.length > 0 && showCountryList ? (
          <Table
            tableData={filteredCountryList}
            columnMapper={countryListColumnMapper}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default CountrySearch;
