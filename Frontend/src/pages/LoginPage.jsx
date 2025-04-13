import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { error, isLoading, login, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // useEffect(() => {
  //   clearError();
  // }, []);

  const onsubmit = async (data) => {
    const trimmedData = await {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
    };
    if (trimmedData.email !== null && trimmedData.password !== null) {
      try {
        await login(trimmedData);
        navigate("/");
      } catch (error) {
        // toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen   w-screen items-center justify-center content-center   m-auto flex   relative ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg  backdrop-fillter
          backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden bg-blue-950/45"
      >
        <div className="p-10">
          <h2 className="text-4xl  p-1 mt-5 mb-9 bg-gradient-to-r from-yellow-400 to-yellow-900 text-transparent  bg-clip-text font-bold  text-center">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Input
              icon={User}
              type="email"
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
              message={"Enter valid email!!"}
            />
            <Input
              icon={Lock}
              type="password"
              name="password"
              placeholder="Password"
              register={register}
              errors={errors}
              message={"Enter valid Password!!"}
            />

            <div className="flex mb-2 ">
              <Link
                to="/forgot-password"
                className="text-sm  text-yellow-500 hover:underline"
              >
                forgot password?
              </Link>
            </div>
            {error && (
              <p className="text-red-500 text-sm font-semibold  mt-2">
                {error}
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-900 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-950 focus:outline-none focus:ring-2 focus:ring-yellow-500 focuse-ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto w-6 h-6" />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?
            <Link to={"/signup"} className="hover:underline  text-yellow-500 ">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
