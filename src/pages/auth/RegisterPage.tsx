import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Text from "../../components/inputField/Text";
import Password from "../../components/inputField/Password";
import Button from "../../components/button/Button";
import Dropdown from "../../components/inputField/Dropdowns";
import ImageContainer from "./ImageContainer";

import FormProps from "../../types/form/form";
import validateEmail from "../../utils/formValidations/emailValidation";
import validatePassword from "../../utils/formValidations/passwordValidation";
import validateName from "../../utils/formValidations/nameValidation";
import { useToast } from "../../hooks/useToast";
import { RegisterFormData } from "../../types/form/registerForm";

import { register } from "../../api/authApi";

const RegistrationPage: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    target: "Lose weight",
    preferableActivity: "Yoga",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    // Update form data first
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedFormData);

    // Clear all errors initially
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    // Validate the changed field
    if (field === "firstName" || field === "lastName") {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid && nameValidation.error) {
        setErrors((prev) => ({ ...prev, [field]: nameValidation.error || "" }));
      }
    } else if (field === "email") {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({ ...prev, email: emailValidation.error || "" }));
      }
    } else if (field === "password") {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid && passwordValidation.error) {
        setErrors((prev) => ({
          ...prev,
          password: passwordValidation.error || "",
        }));
      }

      // Check password match using the updated form data
      if (
        updatedFormData.confirmPassword &&
        value !== updatedFormData.confirmPassword
      ) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (updatedFormData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    } else if (field === "confirmPassword") {
      // Check password match using the updated form data
      if (value !== updatedFormData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validate first name
    const fnameValidation = validateName(formData.firstName);
    if (!fnameValidation.isValid && fnameValidation.error) {
      newErrors.firstName = fnameValidation.error || "";
      isValid = false;
    }

    // Validate last name
    const lnameValidation = validateName(formData.lastName);
    if (!lnameValidation.isValid && lnameValidation.error) {
      newErrors.lastName = lnameValidation.error || "";
      isValid = false;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error || "";
      isValid = false;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid && passwordValidation.error) {
      newErrors.password = passwordValidation.error || "";
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Check target and preferableActivity
    if (!formData.target) {
      newErrors.target = "Target is required.";
      isValid = false;
    }

    if (!formData.preferableActivity) {
      newErrors.preferableActivity = "Preferable activity is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form before submission
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // All validations passed, proceed with registration

    try {
      const didRegister = await register(formData);

      if (didRegister) {
        navigate("/auth/login");
        showToast(
          "success",
          "Registration Successful",
          "Your account has been created successfully!"
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Registration Failed",
        error instanceof Error
          ? error.message
          : "There was an error creating your account, please try again!"
      );
    }
    setIsLoading(false);
  };

  return (
    <section
      id="register-page-container"
      className="grid lg:grid-cols-2 md:grid-cols-1 h-screen w-screen"
    >
      <form id="register-form" onSubmit={handleSubmit}>
        <div
          id="register-form-container"
          className="h-full w-full flex items-center justify-center"
        >
          <div
            id="register-form-content"
            className="w-full py-8 px-10 md:px-15 flex flex-col gap-5"
          >
            <div id="register-header" className="flex flex-col gap-2">
              <p id="register-welcome-text" className="font-[300]">
                LET'S GET YOU STARTED
              </p>
              <h1 id="register-title" className="font-[500] text-2xl">
                Create an Account
              </h1>
            </div>

            <div
              id="register-fields-container"
              className="flex flex-col w-full justify-between"
            >
              <div
                id="register-name-fields"
                className="flex flex-col md:flex-row w-full gap-2"
              >
                <Text
                  id="register-firstName"
                  legendText="First Name"
                  placeholder="Enter your First Name"
                  bottomText="e.g. Jonson"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  hasError={!!errors.firstName}
                  errorMessage={errors.firstName}
                />
                <Text
                  id="register-lastName"
                  legendText="Last Name"
                  placeholder="Enter your Last Name"
                  bottomText="e.g. Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  hasError={!!errors.lastName}
                  errorMessage={errors.lastName}
                />
              </div>

              <Text
                id="register-email"
                legendText="Email"
                placeholder="Enter your email"
                bottomText="e.g. example@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                hasError={!!errors.email}
                errorMessage={errors.email}
              />

              <Password
                id="register-password"
                legendText="Password"
                placeholder="Enter your password"
                bottomText="At least one capital letter required"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                hasError={!!errors.password}
                errorMessage={errors.password}
              />

              <Password
                id="register-confirmPassword"
                legendText="Confirm Password"
                placeholder="Confirm your password"
                bottomText="Must match your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                hasError={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
              />

              <Dropdown
                id="register-target"
                legendText="Your target"
                htmlFor="UserTarget"
                children={[
                  "Lose weight",
                  "Gain weight",
                  "Improve flexibility",
                  "General fitness",
                  "Build Muscle",
                  "Rehabilitation/Recovery",
                ]}
                value={formData.target}
                onChange={(val) => handleChange("target", val)}
                hasError={!!errors.target}
                errorMessage={errors.target}
              />

              <Dropdown
                id="register-preferableActivity"
                legendText="What activity would you prefer?"
                htmlFor="UserPreferableActivity"
                children={[
                  "Yoga",
                  "Climbing",
                  "Strength training",
                  "Cross-fit",
                  "Cardio Training",
                  "Rehabilitation",
                ]}
                value={formData.preferableActivity}
                onChange={(val) => handleChange("preferableActivity", val)}
                hasError={!!errors.preferableActivity}
                errorMessage={errors.preferableActivity}
              />
            </div>

            <div id="register-actions" className="flex flex-col gap-2">
              <Button
                id="register-submit-btn"
                variant="primary"
                className="py-3"
                isLoading={isLoading}
                type="submit"
              >
                Create Account
              </Button>
              <p
                id="register-login-prompt"
                className="w-full flex justify-center font-[300]"
              >
                Already have an account?
                <Link
                  id="register-login-link"
                  to="/auth/login"
                  className="ml-2 underline"
                >
                  <b>LOGIN</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      <div
        id="register-image-container"
        className="hidden md:block h-full w-full p-5"
      >
        <ImageContainer />
      </div>
    </section>
  );
};

export default RegistrationPage;
