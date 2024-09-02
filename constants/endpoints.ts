export const API_ENDPOINT = process.env.EXPO_PUBLIC_API_ENDPOINT;

export const USERS_ENDPOINT = API_ENDPOINT + '/users';

export const CREATE_USER_WITH_GOOGLE = USERS_ENDPOINT + '/google';

export const AUTH = API_ENDPOINT + '/auth';

export const AUTH_WITH_GOOGLE = AUTH + '/google';

export const AUTH_WITH_CREDENTIALS = AUTH + '/credentials';

export const EXPENSES_ENDPOINT = API_ENDPOINT + '/expenses';

export const GROUPS_ENDPOINT = API_ENDPOINT + '/groups';
