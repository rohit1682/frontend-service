import InputFieldsValidation from "../../types/form/inputFieldsValidation";

const validateName = (name: string): InputFieldsValidation => {
  if (!name || name.trim() === "") {
    return { isValid: false, error: "Name is required." };
  }

  if (name.startsWith(" ")) {
    return { isValid: false, error: "Name cannot start with a space." };
  }

  if (name.endsWith(" ")) {
    return { isValid: false, error: "Name cannot end with a space." };
  }

  if (name.length < 2 || name.length > 50) {
    return {
      isValid: false,
      error: "Name must be at least 2 and at most 50 characters long.",
    };
  }

  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      error: "Name can only contain letters and spaces.",
    };
  }

  return { isValid: true };
};

export default validateName;
