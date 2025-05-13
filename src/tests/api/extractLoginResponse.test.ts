import { jwtDecode } from 'jwt-decode';
import extractLoginResponse from '../../utils/extractLoginResponse';

// Mock jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));

describe('extractLoginResponse', () => {
  const mockToken = 'mock.jwt.token';
  
  const mockDecodedToken = {
    sub: '12345',
    email: 'john.doe@example.com',
    role: 'USER',
    firstName: 'John',
    lastName: 'Doe',
    preferableActivity: 'Yoga',
    target: 'Lose weight',
    exp: 1234567890,
    iat: 1234560000
  };
  
  const mockResponse = {
    data: {
      token: mockToken
    }
  };

  beforeEach(() => {
    // Setup jwtDecode mock
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should decode the JWT token from the response', () => {
    // Act
    const result = extractLoginResponse(mockResponse);

    // Assert
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    expect(result).toEqual(mockDecodedToken);
  });

  it('should return the decoded token with all expected properties', () => {
    // Act
    const result = extractLoginResponse(mockResponse);

    // Assert
    expect(result).toHaveProperty('sub');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('role');
    expect(result).toHaveProperty('firstName');
    expect(result).toHaveProperty('lastName');
    expect(result).toHaveProperty('exp');
    expect(result).toHaveProperty('iat');
  });
}); 