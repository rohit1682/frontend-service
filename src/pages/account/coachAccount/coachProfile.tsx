import TitleBar from "../../../layouts/MainLayout/components/TitleBar";
import UpdatePassword from "../updatePassword";
import UpdateCoachGeneralInformation from "./updateCoachGeneralInformation";
import AsideTitle from "../../../components/accountAside/AsideTitle";
import Button from "../../../components/button/Button";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CoachProfile: React.FC = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    "general" | "feedback" | "password"
  >("general");

  return (
    <>
      <section>
        <TitleBar
          title={`My Account - ${userData?.firstName} ${userData?.lastName}`}
        />

        <div className="flex flex-col md:flex-row justify-between">
          <aside className="w-full md:w-1/4 p-4 md:p-10">
            <div className="flex md:flex-col gap-4 md:gap-0">
              <AsideTitle
                className={
                  activeSection === "general" ? "border-l-[#9EF300]" : ""
                }
                text="GENERAL INFORMATION"
                onClick={() => setActiveSection("general")}
              />
              <AsideTitle
                className={
                  activeSection === "feedback" ? "border-l-[#9EF300]" : ""
                }
                text="CLIENT FEEDBACK"
                onClick={() => setActiveSection("feedback")}
              />
              <AsideTitle
                className={
                  activeSection === "password" ? "border-l-[#9EF300]" : ""
                }
                text="CHANGE PASSWORD"
                onClick={() => setActiveSection("password")}
              />
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="mt-5 w-full md:w-max"
                variant="secondary"
              >
                Log Out
              </Button>
            </div>
          </aside>
          <div className="w-full md:w-3/4 px-4 md:px-40 py-8">
            {activeSection === "password" ? (
              <UpdatePassword />
            ) : (
              <UpdateCoachGeneralInformation userType="coach" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoachProfile;
