import React from "react";

function SelectSavingscat({ value, handleChange, savingsCategory }) {

    return (
        <select name="category"
            value={value} onChange={handleChange}
            id="contained-button-file">
            <option value="" required>Savings Category</option>
            {
                savingsCategory?.map(item => <option key={item._id} value={item.category}>{item.category}</option>)
            }
        </select>
    )
}

export default SelectSavingscat