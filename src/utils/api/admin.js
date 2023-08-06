import api from "../axios";

/**
 * Register a new user if the credentails are valid
 * @param {{ name: string, email: string }} credentials data to register a new user
 * @returns {Promise} that will resolve to a new user object or an error object if the supplied credentials are not valid
 */
export const RegisterAdmin = async (admin) => {
  try {
    const { data } = await api.post(`/api/admins`, admin);
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
export const LoginAdmin = async (admin) => {
  try {
    const { data } = await api.post(`/api/admins/login`, admin);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Members = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/members`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Borrowers = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/borrowers`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const LoanRequests = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/loan-request`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const WithdrawalRequest = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/withdrawal-request`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const TotalSavings = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/total-savings`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const MemberSavings = async (user) => {
  try {
    const { data } = await api.get(`/api/admins/member-savings/${user}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const MemberLoan = async (user) => {
  try {
    const { data } = await api.get(`/api/admins/member-loan/${user}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const TotalLoans = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/total-loans`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BorrowersCount = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/borrowers-count`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const MembersCount = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/members-count`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UserLoan = async (userId, signal) => {
  try {
    const { data } = await api.get(`/api/admins/loan/${userId}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const LoanHistory = async (userId, signal) => {
  try {
    const { data } = await api.get(`/api/admins/loans/${userId}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const withdrawalHistory = async (userId, signal) => {
  try {
    const { data } = await api.get(`/api/admins/withdrawal/${userId}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const loanHistory = async (userId, signal) => {
  try {
    const { data } = await api.get(`/api/admins/loans/${userId}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const GetUserDetails = async (signal) => {
  try {
    const { data } = await api.get(`/api/admins/me`, signal);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const UpdateUserDetails = async (userDetails) => {
  try {
    const { data } = await api.put(`/api/admins/profile`, userDetails);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
export const UpdateProfilePicture = async (profilePicture) => {
  try {
    const { data } = await api.put(`/api/admins/update-admin-photo`, profilePicture);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
