import api from "./apiConfig";
import { LoginFormData } from "../types/form/loginForm";
import { RegisterFormData } from "../types/form/registerForm";
import extractLoginResponse from "../utils/extractLoginResponse";
import { store } from "../store/store";
import { login as loginAction } from "../store/authSlice";
import { AxiosError } from "axios";

// Login user and save token in store
export const login = async (formData: LoginFormData) => {
  const requestBody = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await api.post("/auth/sign-in", requestBody);
    const decodedToken = extractLoginResponse(response.data);

    // Store token and user data in Redux
    store.dispatch(
      loginAction({
        token: response.data.data.token,
        userData: decodedToken,
      })
    );

    return true;
  } catch (error) {
    console.error("Error during login:", error);

    // Extract error message if available
    if (error instanceof AxiosError && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

// Register new user
export const register = async (formData: RegisterFormData) => {
  const requestBody = {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    password: formData.password,
    preferableActivity: formData.preferableActivity,
    target: formData.target,
  };

  try {
    await api.post("/auth/sign-up", requestBody);
    return true;
  } catch (error) {
    console.error("Error during registration:", error);

    // Extract error message if available
    if (error instanceof AxiosError && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
