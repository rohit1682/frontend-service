export interface UpdateCoachGeneralInfoFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialization: string[];
  experience?: string;
  aboutMe?: string;
  hourlyRate?: number;
  title?: string;
}

export interface UpdateCoachGeneralInfoFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialization?: string;
  experience?: string;
  aboutMe?: string;
  hourlyRate?: string;
  title?: string; 
}

export interface UpdateCoachGeneralInfoFormValidationResult {
  isValid: boolean;
  errors?: UpdateCoachGeneralInfoFormErrors;
} 