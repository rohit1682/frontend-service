export interface UpdateClientGeneralInfoFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  preferableActivity?: string;
  target?: string;
}

export interface UpdateClientGeneralInfoFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  preferableActivity?: string;
  target?: string;
}

export interface UpdateClientGeneralInfoFormValidationResult {
  isValid: boolean;
  errors?: UpdateClientGeneralInfoFormErrors;
} 