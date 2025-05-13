import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  data: {
    token: string;
    imageUrl: string;
  };
}
interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  preferableActivity?: string;
  target?: string;
  profileImage?: string;
  exp: number;
  iat: number;
}

const extractLoginResponse = (response: LoginResponse): DecodedToken => {
  const decodedToken = jwtDecode<DecodedToken>(response.data.token);
  decodedToken.profileImage = response.data.imageUrl;
  return decodedToken;
};

export default extractLoginResponse;
