"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EyeOff, EyeOpen, Loader } from "@/assets/svg";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/user/reducer";
import { setCookie } from "@/utils/cokies";

interface iform {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [looading, setlooading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iform>();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        data,
        // { withCredentials: true },
      );

      const token = response?.data?.data?.token;

      console.log(response.data, response.data.data.token, "response");
      dispatch(setUser(response?.data?.data?.user));

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
      setCookie("authToken", token, { expires: 10 });
      toast.success("Login Successful");

      setlooading(false);

      router.push("/home");
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      <div className="flex h-full">
        <div className="flex h-screen flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                className="h-12 w-auto"
                src="/logo2.png"
                alt="Workflow"
                width="100"
                height="100"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "email is required",

                          pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className={` ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        id="password"
                        type={showPassword ? "password" : "text"}
                        className={` ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } placeholder- gray-400 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        {...register("password", {
                          required: "password is required",
                          maxLength: {
                            value: 30,
                            message:
                              "Password ust contain special charceters alohabet and digt",
                          },
                        })}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOpen /> : <EyeOff />}
                      </button>

                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="">
                      <Link
                        href="/forgotpassword"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <p className="text-center">
                      <Link
                        href="/register"
                        className="inline-flex items-center font-medium text-indigo-600"
                      >
                        Register now
                      </Link>
                    </p>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign in
                      <Loader
                        className={cn(
                          "absolute ml-16 flex h-4 w-4 justify-center bg-transparent hover:text-black",
                          {
                            "opacity-0": !looading,
                          },
                        )}
                      />
                    </button>
                  </div>

                  <div>
                    <div>
                      <div className="relative mt-10">
                        <div
                          className="absolute inset-0 flex items-center"
                          aria-hidden="true"
                        >
                          <div className="w-full border-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden h-full w-full flex-1 lg:block">
          <Image
            className="absolute inset-0 h-screen w-full object-cover"
            width="900"
            height="1000"
            src="/main.jpg"
            alt="all"
          />
        </div>
      </div>
    </div>
  );
}
