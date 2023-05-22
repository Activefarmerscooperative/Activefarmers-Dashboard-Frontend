import api from "../axios";

/**
 * Register a new user if the credentails are valid
 * @param {{ name: string, email: string }} credentials data to register a new user
 * @returns {Promise} that will resolve to a new user object or an error object if the supplied credentials are not valid
 */
export const RegisterMember = async (user) => {
  try {
    const { data } = await api.post(`/api/users`, user);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const confirmTokenIsValid = async (signal) => {
  try {
    const { data } = await api.get(`api/users/token`,signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AddFarm = async (farm) => {
  try {
    const { data } = await api.put(`/api/users/farm_details`, farm);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AddGuarantor = async (guarantor) => {
  try {
    const { data } = await api.put(`/api/users/guarantor_details`, guarantor);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Login user if the credentails are valid
 * @param {{ password: string, email: string }} credentials data to login a new user
 * @returns {Promise} that will resolve to a new user object or an error object if the supplied credentials are not valid
 */
export const LoginMember = async (user) => {
  try {
    const { data } = await api.post(`/api/users/login`, user);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const MemberDetails = async (signal) => {
  try {
    const { data } = await api.get(`api/users/me`,signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BankList = async (signal) => {
  try {
    const { data } = await api.get(`api/users/bank_list`,signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BankDetails = async (signal) => {
  try {
    const { data } = await api.get(`api/users/bank-details`,signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateBankDetails = async (item) => {
  try {
    const { data } = await api.put(`api/users/bank-details`,item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const GuarantorDetails = async (signal) => {
  try {
    const { data } = await api.get(`api/users/guarantor-details`,signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};