class UsersErrors extends Error {
  constructor(message) {
    super(message);
  }
}

class UserNotFoundError extends UsersErrors {
  constructor(message?: string) {
    super(message || 'user not found');
  }
}

class IncorrectUserCredentialsError extends UsersErrors {
  constructor(message?: string) {
    super(message || 'Incorrect user credentials');
  }
}

class UserAlreadyRegisteredError extends UsersErrors {
  constructor(message?: string) {
    super(message || 'User has already been verified');
  }
}

class InvalidRegistrationTokenError extends UsersErrors {
  constructor(message?: string) {
    super(message || 'Invalid registration token error');
  }
}

class RegistrationTokenExpired extends UsersErrors {
  constructor(message?: string) {
    super(message || 'Registration token has expired');
  }
}

export {
  InvalidRegistrationTokenError,
  RegistrationTokenExpired,
  UserNotFoundError,
  IncorrectUserCredentialsError,
  UserAlreadyRegisteredError,
};
