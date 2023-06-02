import React, { useState, useEffect } from "react";
import { FetchSavingsCategory } from "../utils/api/general"

function SelectSavingscat({ value, handleChange }) {
    const [savingCat, setSavingCat] = useState([])

    useEffect(() => {

        // Fetch location info on component mount.
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchSavingsCategory({ signal })

        return () => {
            abortController.abort(); // Cancel the request on component unmount
        };
    }, [])

    const fetchSavingsCategory = async (signal) => {
        try {
            const data = await FetchSavingsCategory(signal);
            setSavingCat(data.savingsCategory);
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    };
    return (
        <select name="category"
            value={value} onChange={handleChange}
            id="contained-button-file">
            <option value="" required>Savings Category</option>
            {
                savingCat?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
            }
        </select>
    )
}

export default SelectSavingscat