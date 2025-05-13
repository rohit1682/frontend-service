import { useState, useRef } from "react";
import Text from "../../../components/inputField/Text";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../components/inputField/Dropdowns";
import Button from "../../../components/button/Button";
import updateClientGeneralInfoValidation from "../../../utils/formValidations/updateClientGeneralInfoValidation";
import { UpdateClientGeneralInfoFormData } from "../../../types/form/updateClientGeneralInfoForm";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { updateUserProfile } from "../../../api/userApi";
import { login } from "../../../store/authSlice";
import { CiCamera } from "react-icons/ci";
interface GeneralInformationProps {
  userType: string;
}

const UpdateClientGeneralInformation: React.FC<GeneralInformationProps> = ({
  userType,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.auth.userData);
  const [formData, setFormData] = useState<UpdateClientGeneralInfoFormData>({
    firstName: data?.firstName,
    lastName: data?.lastName,
    target: data?.target,
    preferableActivity: data?.preferableActivity,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    data?.profileImage || "/images/Ellipse 8.png"
  );
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleCameraClick = () => {
    // Directly trigger file input click instead of showing the FileUpload component
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      setBase64Image(base64String);
      setProfileImage(base64String); // Update the profile image preview
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
      showToast("error", "Upload Failed", "Failed to process the image");
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = updateClientGeneralInfoValidation(formData);
    setErrors((result.errors as Record<string, string>) || {});

    if (!result.isValid) {
      setErrors((result.errors as Record<string, string>) || {});
      setIsLoading(false);
    } else {
      setErrors({});

      if (data?.sub) {
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.target ||
          !formData.preferableActivity
        ) {
          showToast(
            "error",
            "Validation Error",
            "All required fields must be filled"
          );
          setIsLoading(false);
          return;
        }

        const didUpdate = await updateUserProfile(data.sub, {
          ...formData,
          firstName: formData.firstName,
          lastName: formData.lastName,
          target: formData.target,
          preferableActivity: formData.preferableActivity,
          base64encodedImage: base64Image,
        });

        if (didUpdate) {
          dispatch(
            login({
              token: localStorage.getItem("authToken") || "",
              userData: {
                ...data,
                firstName: formData.firstName || "",
                lastName: formData.lastName || "",
                target: formData.target || "",
                preferableActivity: formData.preferableActivity || "",
                profileImage: base64Image || data?.profileImage,
              },
            })
          );

          showToast(
            "success",
            "Profile Updated",
            "Your profile has been updated successfully!"
          );
          navigate(`/users/clientId`);
        } else {
          showToast(
            "error",
            "Update Failed",
            "There was an error updating your profile, please try again!"
          );
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <div></div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-1 h-12">
              <img
                src={profileImage}
                alt="userProfile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-row gap-2">
                <p className="">Edit</p>
                <button
                  type="button"
                  onClick={handleCameraClick}
                  aria-label="Edit profile picture"
                >
                  <CiCamera className="w-5 h-5  hover:cursor-pointer" />
                </button>
                <input
                  id="profileImage"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  aria-label="Upload profile image"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-2">
              <h1>
                {formData.firstName} {formData.lastName} ({userType})
              </h1>
              <p className="font-light">{data?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-2">
          <Text
            id="firstName"
            legendText="First Name"
            placeholder="Enter your First Name"
            bottomText="e.g. Jonson"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            hasError={!!errors.firstName}
            errorMessage={errors.firstName}
          />
          <Text
            id="lastName"
            legendText="Last Name"
            placeholder="Enter your Last Name"
            bottomText="e.g. Doe"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            hasError={!!errors.lastName}
            errorMessage={errors.lastName}
          />
        </div>

        <Dropdown
          id="target"
          legendText="Target"
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
          id="preferableActivity"
          legendText="Preferable Activity"
          htmlFor="Activity"
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

        <div className="w-full flex justify-end">
          <Button className="py-4" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateClientGeneralInformation;
