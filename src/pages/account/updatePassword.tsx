import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Password from "../../components/inputField/Password";
import updatePasswordValidation from "../../utils/formValidations/updatePasswordValidation";
import { UpdatePasswordFormData } from "../../types/form/updatePasswordForm";
import { changePassword } from "../../api/userApi";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState<UpdatePasswordFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const data = useAppSelector((state: RootState) => state.auth.userData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear all errors initially
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    // If either newPassword or confirmPassword changes, revalidate the match
    if (field === "newPassword" || field === "confirmPassword") {
      const result = updatePasswordValidation({
        ...formData,
        [field]: value,
      });
      setErrors((result.errors as Record<string, string>) || {});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = updatePasswordValidation(formData);
    setErrors((result.errors as Record<string, string>) || {});

    if (!result.isValid) {
      setErrors((result.errors as Record<string, string>) || {});
      setIsLoading(false);
      return;
    }

    if (!data?.sub) {
      showToast("error", "Error", "User ID not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await changePassword(
        formData.oldPassword,
        formData.newPassword,
        data.sub
      );

      if (response && response.success) {
        showToast(
          "success",
          "Password Updated",
          "Your password has been updated successfully!"
        );
        navigate("/");
      } else {
        showToast(
          "error",
          "Update Failed",
          response?.message ||
            "There was an error updating your password, please try again!"
        );
      }
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        "Update Failed",
        apiError?.response?.data?.message ||
          "There was an error updating your password, please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4 my-10 mx-4 md:mx-5 lg:mx-20 max-w-3xl">
        <Password
          id="oldPassword"
          legendText="Current Password"
          value={formData.oldPassword}
          onChange={(e) => handleChange("oldPassword", e.target.value)}
          placeholder="Enter your current password"
          bottomText="Your current account password"
          hasError={!!errors.oldPassword}
          errorMessage={errors.oldPassword}
        />

        <Password
          id="newPassword"
          legendText="New Password"
          value={formData.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          placeholder="Enter your new password"
          bottomText="At least 8 characters with uppercase, lowercase, number and special character"
          hasError={!!errors.newPassword}
          errorMessage={errors.newPassword}
        />

        <Password
          id="confirmPassword"
          legendText="Confirm New Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Confirm your new password"
          bottomText="Must match your new password"
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />

        <div className="w-full flex justify-end">
          <Button className="py-4" isLoading={isLoading}>
            Update Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
