import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/AuthStore";
import { Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const { getProfile } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 60 * 24,
  });
  if (isLoading) {
    return <Loader className="animate-spin   w-20 h-20" />;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg  backdrop-fillter
          backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden my-5 bg-blue-950/55"
    >
      <div className="p-8">
        <h2 className="text-4xl  p-1 mt-5 mb-10 bg-gradient-to-r from-yellow-400 to-yellow-900 text-transparent  bg-clip-text font-bold  text-center">
          Account Details
        </h2>
        <div className="">
          <h1 className="font-semibold text-xl mb-5 my-2  text-yellow-600/80">
            PROFILE DETAILS :
          </h1>
          {Object.entries(data.profile).map(([key, value]) => {
            return (
              <div className="my-5 " key={key}>
                <div className="flex  items-center gap-4 p-2">
                  <h1 className="font-semibold text-lg truncate">
                    {key.toUpperCase()} :
                  </h1>
                  <h1 className="font-semibold text-lg truncate ">{value}</h1>
                </div>
              </div>
            );
          })}
          
        </div>
        <h1 className="font-semibold text-xl mb-5 my-2  text-yellow-600/80">
          {/* DETAILS : */}
        </h1>
        <NavLink
          to="/logout"
          className=" removeLinkHover w-fit block lg:inline-block py-2 px-4 bg-red-500 text-white  rounded "
        >
          <span className="text-white ">Logout</span>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
