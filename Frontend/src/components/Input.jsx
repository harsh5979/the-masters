import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const Input = ({
  icon: Icon,
  register,
  name,
  errors,
  message,
  type,
  condition={},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name === "password";

  return (
    <div className=" mb-6 ">
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex item-center pl-3 pointer-events-none">
            <Icon className="size-5 text-yellow-500 m-auto" />
          </div>
        )}
        <input
          autoFocus
          // required
          type={isPassword ? (showPassword ? "text" : "password") : type}
          {...register(name, { required: message || `${name} is required! ` , ...condition})}
          {...props}
          className={ `w-full no-arrows select-none  ${ Icon ?'pl-10': 'pl-5'} pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition duration-200`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 w-auto  rounded-md right-0 text-xs  px-3  items-center  flex  bg-blue-500 text-white"
          >
            <div className="flex justify-center items-center">
              {showPassword ? <Eye size={25} /> : <EyeClosed size={25} />}
            </div>
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
