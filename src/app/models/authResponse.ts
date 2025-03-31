export interface AuthResponse {
    token: string;
    user: {
      username: string;
      firstName: string;
      lastName: string;
    };
  }