import InputFieldsValidation from "../../types/form/inputFieldsValidation";

const validateEmail = (email: string): InputFieldsValidation => {
  if (!email) {
    return { isValid: false, error: "Email is required." };
  }

  // Email must start with a letter or number and can only have periods and underscores between alphanumeric characters
  const emailRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9]*([._][a-zA-Z0-9]+)*@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error:
        "Invalid email address format. Email must start with a letter or number and can only contain periods (.) or underscores (_) between alphanumeric characters.",
    };
  }

  return { isValid: true };
};

export default validateEmail;
