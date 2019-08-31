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

class InvalidRegistrationMethod extends UsersErrors {
  constructor(message?: string) {
    super(
      message ||
        'Invalid registration method (CELLPHONE, EMAIL are only allowed)',
    );
  }
}

class RegistrationTokenExpiredError extends UsersErrors {
  constructor(message?: string) {
    super(message || 'Registration token has expired');
  }
}

class InvalidLoginOrSignupResult extends UsersErrors {
  constructor(providedResult: string, message?: string) {
    super(
      message || 'Invalid Login or signup result (LOGIN, SIGNUP, VERIFICATION',
    );
  }
}

export {
  InvalidLoginOrSignupResult,
  InvalidRegistrationTokenError,
  InvalidRegistrationMethod,
  RegistrationTokenExpiredError,
  UserNotFoundError,
  IncorrectUserCredentialsError,
  UserAlreadyRegisteredError,
};
