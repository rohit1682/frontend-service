import { useState, useRef, useEffect } from "react";
import Text from "../../../components/inputField/Text";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import updateCoachGeneralInfoValidation from "../../../utils/formValidations/updateCoachGeneralInfoValidation";
import { UpdateCoachGeneralInfoFormData } from "../../../types/form/updateCoachGeneralInfoForm";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { getUserProfile, updateUserProfile } from "../../../api/userApi";
import { login } from "../../../store/authSlice";
import TagInput from "../../../components/TagInput";
import { CiCamera } from "react-icons/ci";
import FileUpload from "../../../components/FileUpload";
import FileCard from "../../../components/FileCard";

interface GeneralInformationProps {
  userType: string;
}

const UpdateCoachGeneralInformation: React.FC<GeneralInformationProps> = ({
  userType,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.auth.userData);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    data?.profileImage || "/images/Ellipse 8.png"
  );
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UpdateCoachGeneralInfoFormData>({
    firstName: "",
    lastName: "",
    specialization: [],
    experience: "",
    title: "",
    aboutMe: "",
  });

  useEffect(() => {
    const fetchUserProfile = async ()=>{
      const response = await getUserProfile(data?.sub || ""); 
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        specialization: response.data.specializations,
        experience: response.data.experience,
        title: response.data.title,
        aboutMe: response.data.about,
      });
    }

    fetchUserProfile();
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | string[]) => {
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
    // Directly trigger file input click
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = updateCoachGeneralInfoValidation(formData);
    setErrors((result.errors || {}) as Record<string, string>);

    if (!result.isValid) {
      setIsLoading(false);
      return;
    }

    if (!data?.sub) {
      showToast("error", "Error", "User ID not found");
      setIsLoading(false);
      return;
    }

    try {
      let base64File: string | undefined;
      if (certificateFile) {
        base64File = await convertFileToBase64(certificateFile);
      }

      const payload = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        preferableActivity: formData.specialization.join(", "),
        about: formData.aboutMe || "",
        specializations: formData.specialization,
        base64encodedFiles: base64File ? [base64File] : [],
        title: formData.title || "",
        base64encodedImage: base64Image,
      };

      const response = await updateUserProfile(data.sub, payload);

      if (response?.success) {
        dispatch(
          login({
            token: localStorage.getItem("authToken") || "",
            userData: {
              ...data,
              firstName: payload.firstName,
              lastName: payload.lastName,
              preferableActivity: payload.preferableActivity,
              profileImage: base64Image || data?.profileImage,
              title: payload.title,
              about: payload.about,
            },
          })
        );
        showToast(
          "success",
          "Profile Updated",
          "Your profile has been updated successfully!"
        );
        navigate(`/users/coachId`);
      } else {
        showToast(
          "error",
          "Update Failed",
          response?.message || "There was an error updating your profile."
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      showToast("error", "Update Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <div></div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <div>
                <img
                  src={profileImage}
                  alt="userProfile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-row gap-2">
                <p className="">Edit</p>
                <button type="button" onClick={handleCameraClick}>
                  <CiCamera className="w-5 h-5 pt-1 hover:cursor-pointer" />
                </button>
                <input
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
              <p className="font-light">{formData.email}</p>
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

        <Text
          id="title"
          legendText="Title"
          placeholder="Enter your title"
          value={formData.title || "Certified Personal Yoga Trainer"}
          onChange={(e) => handleChange("title", e.target.value)}
          hasError={!!errors.title}
          errorMessage={errors.title}
        />

        <Text
          id="aboutMe"
          legendText="About"
          placeholder="About You"
          value={formData.aboutMe}
          onChange={(e) => handleChange("aboutMe", e.target.value)}
          hasError={!!errors.aboutMe}
          errorMessage={errors.aboutMe}
          className="break-words whitespace-normal"
          isTextarea
        />

        <Text
          id="specialization"
          legendText="Specialization"
          customInput={
            <TagInput
              tags={formData.specialization}
              onChange={(tags) => handleChange("specialization", tags)}
              placeholder="Add specialization (e.g. Yoga, Strength)"
            />
          }
          hasError={!!errors.specialization}
          errorMessage={errors.specialization}
        />

        <div className="flex flex-col gap-4">
          <h2>Add your certificates</h2>
          <FileUpload onFileChange={(file) => setCertificateFile(file)} />
        </div>

        <FileCard
          fileName="Mindfulness-Based Stress Reduction (MBSR) Certification.pdf"
          fileSize="(1.8 MB)"
          fileIconSrc="../../../assets/images/pdf.jpg"
        />
        <FileCard
          fileName="Integrative Yoga Therapy Certification.pdf"
          fileSize="(2 MB)"
          fileIconSrc="../../../assets/images/pdf.jpg"
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

export default UpdateCoachGeneralInformation;
