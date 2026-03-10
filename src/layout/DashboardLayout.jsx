import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { apiEndpoints } from "../Util/apiEndpoints";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const registerUser = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        await axios.post(
          apiEndpoints.REGISTER,
          {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsRegistered(true);
      } catch (error) {
        console.log("User already registered");
        setIsRegistered(true);
      }
    };

    registerUser();
  }, [user, getToken]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navbar component goes here */}

      <Navbar activeMenu={activeMenu} />
      {user && isRegistered && (
        <div className="flex">
          <div className="max-[1080]:hidden">
            {/* Side menu goes here */}
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
