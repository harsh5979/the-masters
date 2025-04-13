import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/AuthStore";
import Input from "../components/Input";
import { Loader, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, error, resetPassword } = useAuthStore();


  const onsubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        alert("password do not match ");
        return;
      }
      await resetPassword(token, data.newPassword);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
        <h2 className="text-3xl font-bold mb-7 text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <Input
            icon={Lock}
            type="text"
            name="newPassword"
            placeholder="New Password"
            register={register}
            errors={errors}
            condition={{
              required: "This field is required",
            }}
          />
          <Input
            icon={Lock}
            type="text"
            name='confirmPassword'
            register={register}
            errors={errors}
            condition={{
              required: "This field is required",
            }}
            placeholder="Confirm New Password"
          />
          {error && (
            <p className="text-red-800 mt-2 font-semibold text-sm">{error}</p>
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
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
