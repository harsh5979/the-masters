import React, { useState ,useEffect} from "react";
// import { useAddress, useMetamask } from "@thirdweb-dev/react"; // Add this

import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const { isLoading, CompleteProfile,isAddress,setIsAddress } = useAuthStore();
  const [role, setRole] = useState("");
  // const connectWithMetamask = useMetamask(); // Connect function
  // const address = useAddress(); // Wallet Address
  const [showConnectPopup, setShowConnectPopup] = useState(false);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      // const finalData = {
      //   ...data,
      //   // metaaddress: address, 
      // };
      await CompleteProfile(data);
  
      // await CompleteProfile(data);
      navigate("/");
    } catch (error) {
      // handle error
      
    }
  };
  // const handleConnectWallet = async () => {
  //   try {
  //     await connectWithMetamask();
     
  //     setShowConnectPopup(false); // Hide popup after connecting
  //   } catch (err) {
  //     console.error("Wallet connection failed:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (address) {
  //     localStorage.setItem('walletConnected', "true");
  //     setIsAddress(address); // Save address in your store
  //     setShowConnectPopup(false); // Hide popup if connected
  //   } else {
  //     setShowConnectPopup(true); // Show popup if not connected
  //   }
  // }, [address]);
  


  // const selectedRole = watch("role");
  return (
    <div className="min-h-screen my-5 w-screen flex items-center justify-center m-auto relative">
    {/* {showConnectPopup && (
  <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center min-h-screen w-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
      <button
        onClick={handleConnectWallet}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Connect Metamask
      </button>
    </div>
  </div>
)} */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden bg-blue-950/35"
      >
        <div className="p-10">
          <h2 className="text-4xl p-1 mt-5 mb-8 bg-gradient-to-r from-yellow-400 to-yellow-900 text-transparent bg-clip-text font-bold text-center">
            Complete Profile
          </h2>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col p-2 w-full">

              <div className="">
                <label htmlFor="fullName" className="label">Full Name:</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  register={register}
                  errors={errors}
                  message="Full Name is required!"
                />
              </div>

              <div className="w-full">
                <label htmlFor="phone" className="label">
                  Mobile Number:
                </label>
                <Input
                  type="number"
                  name="phone"
                  placeholder="e.g. 909961XXXX"
                  register={register}
                  errors={errors}
                  message={"Mobile Number is required"}
                  condition={{
                    maxLength: {
                      value: 10,
                      message:
                        "Mobile Number cannot be greater than 10 digits.",
                    },
                    minLength: {
                      value: 10,
                      message: "Mobile Number must be  10 digits.",
                    },
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="label">
                  Role:
                </label>
                <select
                  id="role"
                  {...register("role", { required: "role is required." })}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}

                  className=" px-44 w-full select-none  pl-4 pr-3  py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition duration-200"
                >
                  {["", "Freelancer", "Client"].map((e, i) => (
                    <option value={e} key={i}>
                      {e === "" ? "Select Role" : e}
                    </option>
                  ))}
                </select>
              </div>
              {role === "Freelancer" && (
                <>

                  <div className="">
                    <label htmlFor="skill" className="label">Skills:</label>
                    <Input
                      type="text"
                      name="skill"
                      placeholder="e.g. Web Development, Graphic Design"
                      register={register}
                      errors={errors}
                      message="Skills are required!"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="expriance" className="label">Experience (Years):</label>
                    <Input
                      type="number"
                      name="expriance"
                      placeholder="e.g. 2"
                      register={register}
                      errors={errors}
                      message="expriance is required!"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="protfolio" className="label">Portfolio Link:</label>
                    <Input
                      type="url"
                      name="protfolio"
                      placeholder="https://yourportfolio.com"
                      register={register}
                      errors={errors}
                      message="Portfolio link is required!"
                    />
                  </div>
                </>
              )}

              <div className=" mb-6">
                <label htmlFor="gender" className="label">Gender:</label>
                <div className="text-white">
                  <label className="mr-4">
                    <input
                      type="radio"
                      id="male"
                      value="Male"
                      {...register("gender", { required: "Gender is required." })}
                      className="mr-2 radioDark"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="female"
                      value="Female"
                      {...register("gender", { required: "Gender is required." })}
                      className="mr-2 radioDark"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="mt-5 w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-900 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-950 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto w-6 h-6" />
                ) : (
                  "Save"
                )}
              </motion.button>

            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfilePage;
