interface SignUp {
  email: string;
  name: string | null;
  password: string;
  google_id: string;
}

export interface SignUpWithGoogle extends Omit<SignUp, 'password'> {}
export interface SignUpWithCredentials
  extends Omit<SignUp, 'google_id' | 'name'> {}
