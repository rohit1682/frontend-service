export const store = {
  getState: jest.fn().mockReturnValue({
    auth: {
      userData: {
        sub: "user123",
        role: "USER",
      },
      token: "mock-token",
    },
  }),
  dispatch: jest.fn(),
};
