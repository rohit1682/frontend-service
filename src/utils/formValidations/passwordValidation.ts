import InputFieldsValidation from "../../types/form/inputFieldsValidation";

const validatePassword = (password: string): InputFieldsValidation => {
  if (!password) {
    return { isValid: false, error: "Password is required." };
  }

  if (password.length < 8 || password.length > 16) {
    return { isValid: false, error: "Password must be between 8 and 16 characters long." };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: "Password must include at least one uppercase letter." };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: "Password must include at least one lowercase letter." };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must include at least one number." };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: "Password must include at least one special character." };
  }

  return { isValid: true };
};

export default validatePassword; 