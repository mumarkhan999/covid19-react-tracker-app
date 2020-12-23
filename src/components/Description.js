import React from "react";

function Description({ text1, value1, text2, value2 }) {
    if (text1 === "" && text2 === "") {
        return "";
    }
    return (
        <>
            <p>
                <strong>{text1}: </strong>
                {(value1 === undefined || value1 === "") ? "N/A" : value1}
            </p>
            <p>
                <strong>{text2}: </strong>
                {(value2 === undefined || value2 === "") ? "N/A" : value2}
            </p>
        </>
    );
}

export default Description;
