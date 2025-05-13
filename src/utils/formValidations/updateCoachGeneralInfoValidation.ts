import validateEmail from "./emailValidation";
import validateName from "./nameValidation";
import { 
  UpdateCoachGeneralInfoFormData, 
  UpdateCoachGeneralInfoFormValidationResult 
} from "../../types/form/updateCoachGeneralInfoForm";

const updateCoachGeneralInfoValidation = (
  formData: UpdateCoachGeneralInfoFormData
): UpdateCoachGeneralInfoFormValidationResult => {
  const errors: UpdateCoachGeneralInfoFormValidationResult["errors"] = {};

  if (formData.firstName) {
    const fnameValidation = validateName(formData.firstName);
    if (!fnameValidation.isValid && fnameValidation.error) {
      errors.firstName = fnameValidation.error;
    }
  }

  if (formData.lastName) {
    const lnameValidation = validateName(formData.lastName);
    if (!lnameValidation.isValid && lnameValidation.error) {
      errors.lastName = lnameValidation.error;
    }
  }

  if (formData.email) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      errors.email = emailValidation.error;
    }
  }

  if (!formData.specialization) {
    errors.specialization = "Specialization is required.";
  }

  if (!formData.experience) {
    errors.experience = "Experience is required.";
  }

  if (!formData.aboutMe) {
    errors.aboutMe = "About me description is required.";
  } else if (formData.aboutMe.length < 50) {
    errors.aboutMe = "About me description should be at least 50 characters.";
  }

  if (formData.hourlyRate !== undefined && formData.hourlyRate <= 0) {
    errors.hourlyRate = "Hourly rate must be greater than zero.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default updateCoachGeneralInfoValidation; 