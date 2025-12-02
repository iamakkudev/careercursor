import { User, Mail, CheckCircle, XCircle, KeyRound, Clock } from "lucide-react";
import Input from "../../components/Input2.jsx";
import { useAuthStore } from "../../store/AuthStore.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
      });
    }
  }, [user]);

  const handleResetPassword = () => {
    navigate("/reset-password");
  };
  return (
    <div className="w-full min-h-screen flex justify-center py-10 px-4 sm:px-8 ">
      <div className="w-full sm:w-11/12 md:w-4/5 lg:w-2/3  border-2 shadow-md rounded-2xl p-6 sm:p-10 flex flex-col items-center">
        
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user?.profilePic=="" || "/avatar.png"}
            alt="Profile"
            className="size-20 sm:size-32 border-4 border-violet-800 rounded-full p-1 object-cover"
          />
          {user?.isVerified ? (
            <CheckCircle className="absolute bottom-2 right-2 text-green-500 h-6 w-6" />
          ) : (
            <XCircle className="absolute bottom-2 right-2 text-red-500 h-6 w-6" />
          )}
        </div>

        {/* Basic Info */}
        <div className="mt-6 w-full sm:w-4/5 space-y-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              icon={User}
              type="text"
              value={formData.name}
              placeholder="Full Name"
              disabled
            />
            <Input
              icon={Mail}
              type="email"
              value={formData.email}
              placeholder="Email"
              disabled
            />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="w-full sm:w-4/5 mt-8 space-y-4 text-center sm:text-left text-violet-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Roadmap:</span>
              <span
                className={`${
                  user?.Roadmap ? "text-green-600" : "text-red-500"
                } font-medium`}
              >
                {user?.Roadmap ? "Available" : "Not Created"}
              </span>
            </div>

            <div
              onClick={handleResetPassword}
              className="flex items-center gap-2 text-violet-700 hover:text-violet-900 cursor-pointer font-semibold"
            >
              <KeyRound className="w-5 h-5" />
              Change Password
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              {user?.isVerified ? (
                <span className="text-green-600 font-medium">Verified</span>
              ) : (
                <span className="text-red-500 font-medium">Unverified</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="text-sm">
                Last Login:{" "}
                {user?.lastlogin
                  ? new Date(user.lastlogin).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
