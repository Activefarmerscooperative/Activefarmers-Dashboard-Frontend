import api from "../axios";

/**
 * Get list of states
 * @returns {Promise} that will return list of countries
 */
export const wakeServer = async (signal) => {
    try {
        const { data } = await api.get(`/`, signal);
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
 * Get list of states
 * @returns {Promise} that will return list of countries
 */
export const fetchAllStates = async (signal) => {
    try {
        const { data } = await api.get(`/api/location/states`, signal);
        console.log(data)
        return data;

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request aborted', error.message);
        } else {
            throw error.response?.data;
        }

    }
};
export const fetchAllLga = async (state, signal) => {
    console.log(state)
    try {
        const { data } = await api.get(`/api/location/lga/${state}`, signal);
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
        const { data } = await api.get(`/api/users/savings-category`, signal);
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request aborted', error.message);
        } else {
            throw error.response?.data;
        }

    }
};