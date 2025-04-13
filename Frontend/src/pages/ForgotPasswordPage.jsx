import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { ArrowBigLeft, ArrowLeft, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, error, forgotPassword, isStatus } = useAuthStore();
  const [email, setEmail] = useState("");
  const onsubmit = async () => {
    // e.preventDefault();
    try {
      await forgotPassword(email);
    } catch (error) {}
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-fillter
    backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-7 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isStatus ? (
          <form onSubmit={handleSubmit(onsubmit)}>
            <p className="text-sm text-gray-300 mb-6 md:mx-5 mx-auto text-center">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
              message={"Enter valid email!!"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <p className="text-sm text-red-500 mt-2 font-semibold">{error}</p>
            )}
            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focuse-ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-green-500 flex items-center rounded-full mb-4 mx-auto justify-center"
            >
              <Mail className="w-8 h-8" />
            </motion.div>
            <p className="text-gray-300 mb-6 text-center mx-auto">
              If an account exists for {email},you will receive a password reset
              link shortly.
            </p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          <Link
            to={"/login"}
            className="hover:underLine text-green-500 ml-1 flex gap-2 "
          >
            <ArrowLeft size={20} />
            Back to Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
