// This file is used to test that all imports are working correctly
// If this file compiles without errors, the imports are working

// Base validation imports
import validateEmail from "./emailValidation";
import validateName from "./nameValidation";
import validatePassword from "./passwordValidation";

// Form validation imports
import updatePasswordValidation from "./updatePasswordValidation";
import updateClientGeneralInfoValidation from "./updateClientGeneralInfoValidation";
import updateCoachGeneralInfoValidation from "./updateCoachGeneralInfoValidation";

// Types imports
import { LoginFormData } from "../../types/form/loginForm";
import { RegisterFormData } from "../../types/form/registerForm";
import { UpdatePasswordFormData } from "../../types/form/updatePasswordForm";
import { UpdateClientGeneralInfoFormData } from "../../types/form/updateClientGeneralInfoForm";
import { UpdateCoachGeneralInfoFormData } from "../../types/form/updateCoachGeneralInfoForm";

// Test function to verify imports
export function testValidationImports() {
  console.log("Testing validation imports...");
  
  // Test base validations
  const emailResult = validateEmail("test@example.com");
  const nameResult = validateName("John");
  const passwordResult = validatePassword("Password123!");
  
  // Example data 
  const loginData: LoginFormData = { email: "test@example.com", password: "Password123!" };
  
  // const registerData: RegisterFormData = { 
  //   firstName: "John", 
  //   lastName: "Doe", 
  //   email: "test@example.com", 
  //   password: "Password123!",
  //   preferableActivity: "Yoga",
  //   target: "Lose weight"
  // };
  
  const updatePasswordData: UpdatePasswordFormData = {
    oldPassword: "Password123!",
    newPassword: "NewPassword123!",
    confirmPassword: "NewPassword123!"
  };
  const updatePasswordResult = updatePasswordValidation(updatePasswordData);
  
  const updateClientData: UpdateClientGeneralInfoFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    preferableActivity: "Yoga",
    target: "Lose weight"
  };
  const updateClientResult = updateClientGeneralInfoValidation(updateClientData);
  
  const updateCoachData: UpdateCoachGeneralInfoFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    specialization: ["Yoga"],
    experience: "5 years",
    aboutMe: "Experienced yoga instructor with 5 years of teaching experience",
    hourlyRate: 50
  };
  const updateCoachResult = updateCoachGeneralInfoValidation(updateCoachData);
  
  return {
    emailResult,
    nameResult,
    passwordResult,
    updatePasswordResult,
    updateClientResult,
    updateCoachResult
  };
} 