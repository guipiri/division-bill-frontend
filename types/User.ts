export interface User {
  id: string;
  email: string;
  name: string | null;
  google_id?: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

export interface UserFromGoogle {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}
