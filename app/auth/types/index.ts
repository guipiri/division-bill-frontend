interface SignUp {
  email: string;
  name: string | null;
  password: string;
  google_id: string;
}

export interface SignUpWithGoogle extends Omit<SignUp, 'password'> {}
export interface SignUpWithCredentials
  extends Omit<SignUp, 'google_id' | 'name'> {}

export interface User {
  id: string;
  email: string;
  name: string | null;
  google_id?: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}
