import api from "./apiConfig";
import { store } from "../store/store";

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`user/users/${userId}`);
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
  const token = store.getState().auth.token;
  const response = await api.patch(
    `user/users/profile`,
    { ...profileData, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  userId: string
) => {
  const token = store.getState().auth.token;
  const response = await api.patch(
    `user/users/password`,
    {
      newPassword,
      currentPassword,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
