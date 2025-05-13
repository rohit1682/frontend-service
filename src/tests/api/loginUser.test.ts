import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { login } from "../../api/authApi";
import extractLoginResponse from "../../utils/extractLoginResponse";
import { store } from "../../store/store";
import { login as loginAction } from "../../store/authSlice";
import { LoginFormData } from "../../types/form/loginForm";

// Mock dependencies
jest.mock("../../store/store", () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
  },
}));

jest.mock("../../store/authSlice", () => ({
  login: jest.fn(),
}));

jest.mock("../../utils/extractLoginResponse", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ sub: "user123", role: "USER" }),
}));

jest.mock("../../api/apiConfig", () => {
  return {
    __esModule: true,
    default: axios,
  };
});

describe("login", () => {
  let mockAxios: MockAdapter;

  // Test data
  const mockFormData: LoginFormData = {
    email: "test@example.com",
    password: "Password123",
  };

  beforeEach(() => {
    // Set up a fresh mock for axios
    mockAxios = new MockAdapter(axios);

    // Mock console.error to avoid polluting test output
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it("should successfully login a user when API call succeeds", async () => {
    // Arrange
    const mockResponse = {
      data: {
        token: "fake-token-123",
      },
    };

    mockAxios.onPost("/auth/sign-in").reply(200, {
      data: mockResponse,
    });

    // Act
    const result = await login(mockFormData);

    // Assert
    expect(result).toBe(true);
    expect(extractLoginResponse).toHaveBeenCalledWith({ data: mockResponse });
    expect(store.dispatch).toHaveBeenCalledWith(
      loginAction({
        token: "fake-token-123",
        userData: { sub: "user123", role: "USER" },
      })
    );
  });

  it("should throw an error when API returns an error message", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-in").reply(400, {
      error: "Invalid credentials",
    });

    // Act & Assert
    await expect(login(mockFormData)).rejects.toThrow("Invalid credentials");
  });

  it("should throw an error when network error occurs", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-in").networkError();

    // Act & Assert
    await expect(login(mockFormData)).rejects.toThrow();
  });
});
