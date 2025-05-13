export interface UpdatePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordFormErrors {
  password?: string; // For old password
  newPassword?: string;
  confirmPassword?: string;
}

export interface UpdatePasswordFormValidationResult {
  isValid: boolean;
  errors?: UpdatePasswordFormErrors;
} 