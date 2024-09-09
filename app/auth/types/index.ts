interface SignUp {
  email: string;
  name: string | null;
  password: string;
  googleId: string;
  photo: string | null;
}

export interface SignUpWithGoogle extends Omit<SignUp, 'password'> {}

export interface SignWithCredentials
  extends Omit<SignUp, 'googleId' | 'name' | 'photo'> {}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}
