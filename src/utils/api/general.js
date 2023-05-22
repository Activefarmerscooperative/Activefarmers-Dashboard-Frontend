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