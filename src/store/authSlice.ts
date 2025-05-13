import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  sub: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  preferableActivity?: string;
  target?: string;
  exp: number;
  iat: number;
  profileImage?: string;
  title?: string;
  about?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userData: UserData | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userData: null,
  token: null,
};

// Check if we have user data in localStorage on initialization
const loadState = (): AuthState => {
  try {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      return {
        isLoggedIn: true,
        userData: JSON.parse(userData),
        token,
      };
    }
  } catch (e) {
    console.error("Error loading auth state:", e);
  }

  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userData: UserData }>
    ) => {
      state.isLoggedIn = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;

      // Store in localStorage
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    },
    resetState: (state) => {
      // Reset to initial state
      state.isLoggedIn = false;
      state.userData = null;
      state.token = null;
    },
  },
});

export const { login, logout, resetState } = authSlice.actions;
export default authSlice.reducer;
