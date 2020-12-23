import React from "react";

function Countries({ countries, handleCountrySelect }) {
    const countriesOptions = countries.map((country) => (
        <option key={country.Country} value={country.Country}>
            {country.Country}
        </option>
    ));

    return (
        <select
            className="select-css"
            onChange={(event) =>
                handleCountrySelect(
                    event.target.options[event.target.selectedIndex].text
                )
            }
        >
            {countriesOptions}
        </select>
    );
}

export default Countries;
