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



export const VerifyOTP = async (token) => {
  try {
    const { data } = await api.put(`/api/users`, token);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const confirmTokenIsValid = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/token`, signal);
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

export const ForgotPassword = async (user) => {
  try {
    const { data } = await api.post(`/api/users/forgot-pw`, user);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const LoginVerifyOTP = async (token) => {
  try {
    const { data } = await api.post(`/api/users/verify-token`, token);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ResetPassword = async (user) => {
  try {
    const { data } = await api.put(`/api/users/reset-pw`, user);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const MemberDetails = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/me`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BankList = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/bank_list`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BankDetails = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/bank-details`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const UpdateUserDetails = async (item) => {
  try {
    const { data } = await api.put(`/api/users/personal_details`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateProfilePhoto = async (item) => {
  try {
    const { data } = await api.post(`/api/users/update-user-photo`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateBankDetails = async (item) => {
  try {
    const { data } = await api.put(`/api/users/bank-details`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const GuarantorDetails = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/guarantor-details`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateGuarantorDetails = async (item) => {
  try {
    const { data } = await api.put(`/api/users/guarantor_details`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateOccupationDetails = async (item) => {
  try {
    const { data } = await api.put(`/api/users/occupation_details`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateNextOfKinDetails = async (item) => {
  try {
    const { data } = await api.put(`/api/users/nextOfKin_details`, item);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetWallet = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/savings-wallet`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};


export const MyLoan = async (signal) => {
  try {
    const { data } = await api.get(`/api/users/myLoan`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetTransactions = async (type) => {
  try {
    const { data } = await api.get(`/api/users/transactions?type=${type}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};


export const AddSaving = async (savings) => {
  try {
    const { data } = await api.post(`/api/users/savings`, savings);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const ValidatePayment = async (reference) => {
  try {
    const { data } = await api.post(`/api/payments/validate`, reference);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const WithdrawalRequest = async (withdrawal) => {
  try {
    const { data } = await api.post(`/api/users/savings/withdrawal`, withdrawal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const LoanRequest = async (loan) => {
  try {
    const { data } = await api.post(`/api/users/loan`, loan);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ValidateCard = async () => {
  try {
    const { data } = await api.post(`/api/users/loan/card`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ValidateSavedCard = async () => {
  try {
    const { data } = await api.put(`/api/users/loan/card`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CancelLoan = async () => {
  try {
    const { data } = await api.put(`/api/users/loan`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};