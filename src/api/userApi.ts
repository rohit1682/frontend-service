import api from "./apiConfig";

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (
  userId: string,
  profileData: {
    firstName: string;
    lastName: string;
    preferableActivity: string;
    target?: string;
    about?: string;
    specializations?: string[];
    base64encodedImage?: string;
    base64encodedFiles?: string[];
    title?: string;
  }
) => {
  const response = await api.put(`/users/${userId}`, profileData);
  return response.data;
};


export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  userId: string
) => {
  const response = await api.put(`/users/${userId}/password`, {
    newPassword,
    oldPassword,
    userId,
  });
  return response.data;
};
