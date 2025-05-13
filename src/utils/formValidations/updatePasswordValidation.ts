import validatePassword from "./passwordValidation";
import {
  UpdatePasswordFormData,
  UpdatePasswordFormValidationResult,
} from "../../types/form/updatePasswordForm";

const updatePasswordValidation = (
  formData: UpdatePasswordFormData
): UpdatePasswordFormValidationResult => {
  const errors: UpdatePasswordFormValidationResult["errors"] = {};

  // Check old password
  if (!formData.oldPassword) {
    errors.oldPassword = "Current password is required.";
  } else {
    const oldPasswordValidation = validatePassword(formData.oldPassword);
    if (!oldPasswordValidation.isValid && oldPasswordValidation.error) {
      errors.oldPassword = oldPasswordValidation.error;
    }
  }

  // Check new password
  if (!formData.newPassword) {
    errors.newPassword = "New password is required.";
  } else {
    const newPasswordValidation = validatePassword(formData.newPassword);
    if (!newPasswordValidation.isValid && newPasswordValidation.error) {
      errors.newPassword = newPasswordValidation.error;
    }
  }

  // Check confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
  } else {
    const confirmPasswordValidation = validatePassword(
      formData.confirmPassword
    );
    if (!confirmPasswordValidation.isValid && confirmPasswordValidation.error) {
      errors.confirmPassword = confirmPasswordValidation.error;
    }
  }

  // Check if new password and confirm password match
  if (
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword !== formData.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default updatePasswordValidation;
