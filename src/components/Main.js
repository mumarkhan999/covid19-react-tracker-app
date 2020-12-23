import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import Countries from "./Countries";
import FilterButton from "./FilterButton";
import Description from "./Description";

function Main() {
    // hooks
    const [selectedCountry, setSelectedCountry] = React.useState("");
    const [filteredCountryData, setFilteredCountryData] = React.useState({});
    const [description, setDescription] = React.useState({
        text1: "",
        value1: "",
        text2: "",
        value2: "",
    });
    const {
        isLoading: countriesIsLoading,
        error: countriesError,
        data: countriesData,
    } = useQuery("countiesData", async () => {
        let countriesData = (
            await axios.get("https://api.covid19api.com/countries")
        ).data;
        if (countriesData && countriesData.length > 0) {
            countriesData.sort((a, b) => {
                if (a.Country < b.Country) {
                    return -1;
                }
                if (a.Country > b.Country) {
                    return 1;
                }
                return 0;
            });
            setSelectedCountry(countriesData[0].Country);
        }
        return countriesData;
    });
    const {
        isLoading: summaryIsLoading,
        error: summaryError,
        data: summaryData,
    } = useQuery("summaryData", async () => {
        let summaryData = (
            await axios.get("https://api.covid19api.com/summary")
        ).data;
        if ("Countries" in summaryData) {
            return summaryData.Countries;
        } else {
            return null;
        }
    });

    // setters
    const filterCountryData = () => {
        if (
            selectedCountry !== "" &&
            Object.keys(filteredCountryData).length > 0
        ) {
            if (selectedCountry === filteredCountryData.Country) {
                // if you have already get the data of same country
                // no need to filter that data again
                return filteredCountryData;
            }
        }
        let countryData = summaryData.filter(
            (countryData) => countryData.Country === selectedCountry
        );
        if (countryData.length > 0) {
            setFilteredCountryData(countryData[0]);
            return countryData[0];
        } else {
            setFilteredCountryData({});
            return {};
        }
    };

    // handlers
    var handleCountrySelect = (countryName) => {
        setSelectedCountry(countryName);
        setDescription({
            text1: "",
            value1: "",
            text2: "",
            value2: "",
        });
    };

    const buttonMapping = {
        CONFIRMED: "Confirmed Cases",
        DEATHS: "Deaths",
        RECOVERED: "Recovered",
    };

    const handleClick = (event) => {
        let currentCountry = filterCountryData();
        switch (event.target.value) {
            case buttonMapping.CONFIRMED:
                setDescription({
                    text1: "New confirmed cases",
                    value1: currentCountry.NewConfirmed,
                    text2: "Total confirmed cases",
                    value2: currentCountry.TotalConfirmed,
                });
                break;
            case buttonMapping.DEATHS:
                setDescription({
                    text1: "New deaths",
                    value1: currentCountry.NewDeaths,
                    text2: "Total deaths",
                    value2: currentCountry.TotalDeaths,
                });
                break;
            case buttonMapping.RECOVERED:
                setDescription({
                    text1: "New recovered cases",
                    value1: currentCountry.NewRecovered,
                    text2: "Total recovered cases",
                    value2: currentCountry.TotalRecovered,
                });
                break;
            default:
                break;
        }
    };

    // final return statements

    if (countriesIsLoading || summaryIsLoading) return <p>"Loading ..."</p>;

    if (summaryData === null)
        return (
            <p>
                "Couldn't fetch country details. One possible reason is that
                caching might be in progress."
            </p>
        );

    if (countriesError || summaryError)
        return (
            <p>
                "Error:" {countriesError.message} {summaryError.message}
            </p>
        );

    return (
        <div>
            <h1 className="main-heading">COVID19 TRACKER</h1>
            <div className="main">
                <div className="countries">
                    <Countries
                        countries={countriesData}
                        handleCountrySelect={handleCountrySelect}
                    />
                </div>
                <div className="btn-group country-buttons">
                    <FilterButton
                        value={buttonMapping.CONFIRMED}
                        handleClick={handleClick}
                    />
                    <FilterButton
                        value={buttonMapping.DEATHS}
                        handleClick={handleClick}
                    />
                    <FilterButton
                        value={buttonMapping.RECOVERED}
                        handleClick={handleClick}
                    />
                </div>
            </div>
            <div className="description">
                <Description
                    text1={description.text1}
                    value1={description.value1}
                    text2={description.text2}
                    value2={description.value2}
                />
            </div>
        </div>
    );
}

export default Main;
