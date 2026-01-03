export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ValidationErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValidationErrors = {
  email: string;
  password: string;
};

export function validateSignUp(data: SignUpFormData): ValidationErrors {
  const errors: ValidationErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate password
  if (!data.password || data.password.length === 0) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Validate confirm password
  if (!data.confirmPassword || data.confirmPassword.length === 0) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match. Please try again.";
  }

  return errors;
}

export function validateLogin(data: LoginFormData): LoginValidationErrors {
  const errors: LoginValidationErrors = {
    email: "",
    password: "",
  };

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate password
  if (!data.password || data.password.length === 0) {
    errors.password = "Password is required";
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
