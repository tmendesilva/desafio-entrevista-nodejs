const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const PasswordValidator = {
  password,
};

export const PasswordMessages = {
  PASSWORD_VALIDATION:
    'The password must contain lower case letters, numbers and special characters',
  PASSWORD_OR_EMAIL_INVALID: 'Email and/or password are invalid',
};
