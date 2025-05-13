import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormProps from "../../types/form/form";
import Text from "../../components/inputField/Text";
import Password from "../../components/inputField/Password";
import Button from "../../components/button/Button";

import ImageContainer from "./ImageContainer";

import validateEmail from "../../utils/formValidations/emailValidation";
import validatePassword from "../../utils/formValidations/passwordValidation";
import { login } from "../../api/authApi";
import { useToast } from "../../hooks/useToast";
import { LoginFormData } from "../../types/form/loginForm";

const LoginPage: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate only the field that changed
    if (field === "email") {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({ ...prev, email: emailValidation.error || "" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } else if (field === "password") {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid && passwordValidation.error) {
        setErrors((prev) => ({
          ...prev,
          password: passwordValidation.error || "",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error;
      isValid = false;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid && passwordValidation.error) {
      newErrors.password = passwordValidation.error;
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

    // All validations passed, proceed with login
    try {
      const didLogin = await login(formData);

      if (didLogin) {
        navigate(`/`);
      }
    } catch (error) {
      showToast(
        "error",
        "Login Failed",
        error instanceof Error
          ? error.message
          : "There was an error found with your credentials, please try again!"
      );
    }
    setIsLoading(false);
  };

  return (
    <section
      id="login-page-container"
      className="grid lg:grid-cols-2 md:grid-cols-1 h-screen w-screen"
    >
      <form id="login-form" onSubmit={handleSubmit}>
        <div
          id="login-form-container"
          className="h-full w-full flex items-center justify-center"
        >
          <div
            id="login-form-content"
            className="w-full p-10 md:p-20 flex flex-col gap-8"
          >
            <div id="login-header">
              <p id="login-welcome-text" className="font-[300]">
                WELCOME BACK
              </p>
              <h1 id="login-title" className="font-[500] text-2xl">
                Log In to Your Account
              </h1>
            </div>

            <div id="login-fields-container" className="flex flex-col gap-2">
              <Text
                id="login-email"
                legendText="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                bottomText="e.g. username@domain.com"
                hasError={!!errors.email}
                errorMessage={errors.email}
              />
              <Password
                id="login-password"
                legendText="Password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                bottomText="At least one capital letter required"
                hasError={!!errors.password}
                errorMessage={errors.password}
              />
            </div>

            <div id="login-actions" className="flex flex-col gap-2">
              <Button
                id="login-submit-btn"
                variant="primary"
                className="py-4"
                type="submit"
                isLoading={isLoading}
              >
                Login
              </Button>
              <p
                id="login-signup-prompt"
                className="w-full flex justify-center font-[300]"
              >
                Don't have an account?
                <Link
                  id="login-signup-link"
                  to="/auth/register"
                  className="ml-2 underline"
                >
                  <b>CREATE NEW ACCOUNT</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      <div
        id="login-image-container"
        className="hidden md:block h-full w-full p-5"
      >
        <ImageContainer />
      </div>
    </section>
  );
};

export default LoginPage;
