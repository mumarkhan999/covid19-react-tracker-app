import React from "react";

function FilterButton({ value, handleClick }) {
    return (
        <button className="btn btn-primary" value={value} onClick={(event) => handleClick(event)}>
            {value}
        </button>
    );
}

export default FilterButton;
