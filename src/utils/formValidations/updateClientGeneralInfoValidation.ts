import validateEmail from "./emailValidation";
import validateName from "./nameValidation";
import { 
  UpdateClientGeneralInfoFormData, 
  UpdateClientGeneralInfoFormValidationResult 
} from "../../types/form/updateClientGeneralInfoForm";

const updateClientGeneralInfoValidation = (
  formData: UpdateClientGeneralInfoFormData
): UpdateClientGeneralInfoFormValidationResult => {
  const errors: UpdateClientGeneralInfoFormValidationResult["errors"] = {};

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

  if (!formData.preferableActivity) {
    errors.preferableActivity = "Preferable activity is required.";
  }

  if (!formData.target) {
    errors.target = "Target is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default updateClientGeneralInfoValidation; 