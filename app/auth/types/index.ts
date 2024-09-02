interface SignUp {
  email: string;
  name: string | null;
  password: string;
  google_id: string;
  photo: string | null;
}

export interface SignUpWithGoogle extends Omit<SignUp, 'password'> {}

export interface SignWithCredentials
  extends Omit<SignUp, 'google_id' | 'name' | 'photo'> {}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}
