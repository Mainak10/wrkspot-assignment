import { useEffect, useState } from "react";
import { Input, Select, Button, Typography, Space } from "antd";
import "./CountrySearch.css";
import {
  populationFilterOptions,
  countryColumns,
  countryListColumnMapper,
} from "./const";
import { v4 as uuidv4 } from "uuid";
import { fetchCountryDetails } from "../../api/getCountryList";
import Table from "../Table/Table";

const { Title } = Typography;
const { Option } = Select;

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

  const handleCountryNameChange = (e) => {
    setCountryNameFilter(e.target.value);
  };

  const handlePopulationOptionChange = (value) => {
    setSelectedPopulationOption(value);
  };

  const clearAllFilters = () => {
    setCountryNameFilter("");
    setSelectedPopulationOption("-1");
    setFilteredCountryList(countryList);
  };

  return (
    <div className="country-search-container">
      <Title level={3}>Countries Info</Title>
      <div className="table-controller">
        <Space direction="horizontal">
          <Input
            placeholder="Country Name"
            value={countryNameFilter}
            onChange={handleCountryNameChange}
            style={{ width: 200 }}
          />
          <Select
            value={selectedPopulationOption}
            onChange={handlePopulationOptionChange}
            style={{ width: 200 }}
          >
            <Option value="-1" disabled>
              Population
            </Option>
            {populationFilterOptions.map((el) => (
              <Option key={uuidv4()} value={el.value}>
                {el.label}
              </Option>
            ))}
          </Select>
          <Button type="link" onClick={clearAllFilters}>
            Clear
          </Button>
        </Space>
        <Button
          type="primary"
          disabled={showCountryList}
          onClick={() => setShowCountryList(true)}
          style={{ backgroundColor: "#6366f1", borderColor: "#6366f1" }}
        >
          Show all Countries
        </Button>
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
