import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { register } from "../../api/authApi";
import { RegisterFormData } from "../../types/form/registerForm";
import { store } from "../../store/store";

// Mock the dependencies
jest.mock("../../store/store", () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

jest.mock("../../api/apiConfig", () => {
  return {
    __esModule: true,
    default: axios,
  };
});

describe("register", () => {
  let mockAxios: MockAdapter;

  // Test data
  const mockFormData: RegisterFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "Password123",
    confirmPassword: "Password123",
    target: "Lose weight",
    preferableActivity: "Yoga",
  };

  // Expected request body (without confirmPassword)
  const expectedRequestBody = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "Password123",
    target: "Lose weight",
    preferableActivity: "Yoga",
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

  it("should successfully register a user when API call succeeds", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-up").reply(201, {
      success: true,
    });

    // Act
    const result = await register(mockFormData);

    // Assert
    expect(result).toBe(true);
    expect(mockAxios.history.post.length).toBe(1);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(
      expectedRequestBody
    );
  });

  it("should throw an error when API returns an error message", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-up").reply(400, {
      error: "Email already exists",
    });

    // Act & Assert
    await expect(register(mockFormData)).rejects.toThrow(
      "Email already exists"
    );
  });

  it("should throw an error when network error occurs", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-up").networkError();

    // Act & Assert
    await expect(register(mockFormData)).rejects.toThrow();
  });

  it("should not send confirmPassword to the API", async () => {
    // Arrange
    mockAxios.onPost("/auth/sign-up").reply(201, {
      success: true,
    });

    // Act
    await register(mockFormData);

    // Assert
    const sentData = JSON.parse(mockAxios.history.post[0].data);
    expect(sentData).not.toHaveProperty("confirmPassword");
    expect(Object.keys(sentData).length).toBe(6); // Only the required fields
  });
});
