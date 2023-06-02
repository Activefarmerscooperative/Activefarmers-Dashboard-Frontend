import api from "../axios";

/**
 * Get list of states
 * @returns {Promise} that will return list of countries
 */
export const fetchAllStates = async (signal) => {
    try {
        const { data } = await api.get(`/api/location/states`,signal);
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request aborted', error.message);
        } else {
            throw error.response?.data;
        }

    }
};

/**
 * Get list of savings category
 * @returns {Promise} that will return list of countries
 */
export const FetchSavingsCategory = async (signal) => {
    try {
        const { data } = await api.get(`/api/users/savings-category`,signal);
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request aborted', error.message);
        } else {
            throw error.response?.data;
        }

    }
};