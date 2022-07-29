export const USER_LOGIN = 'USER_LOGIN';

export const changeUserEmail = (email) => (
  {
    type: USER_LOGIN,
    email,
  }
);
