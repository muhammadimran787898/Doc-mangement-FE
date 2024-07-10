"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeOff, EyeOpen } from "@/assets/svg";

interface iform {
  password: string;
  confirmPassword: string;
}

export default function Resetpassword({ id }: { id: any }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<iform>();

  const password = watch("password", "");
  const onSubmit = (data: any) => {
    console.log(data);

    const sendData = async () => {
      await axios
        .post("http://localhost:5000/api/v1/user/resetpassword", {
          id,
          ...data.password,
        })
        .then((response) => {
          console.log(response.data, "response");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    sendData();

    router.push("/login");
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="w-5/12 rounded-xl bg-white p-8 shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <p className="text-slate-500">Fill up the form to reset the password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="my-10">
          <div className="flex flex-col space-y-5">
            <div>
              <label htmlFor="password">
                <p className="pb-2 font-medium text-slate-700">Password</p>
              </label>

              <div className="relative mt-1">
                <input
                  id="password"
                  type="text"
                  className={` ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder- gray-400 block w-full appearance-none rounded-md border px-3 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  {...register("password", {
                    required: "password is required",
                    maxLength: {
                      value: 30,
                      message:
                        "Password ust contain special charceters alohabet and digt",
                    },
                  })}
                />
              </div>

              <div className="my-3">
                <label htmlFor="confirmpassword">
                  <p className="pb-2 font-medium text-slate-700">
                    Confirm Password
                  </p>
                </label>

                <div className="relative mt-1">
                  <input
                    id="password"
                    type="text"
                    className={` ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } placeholder- gray-400 block w-full appearance-none rounded-md border px-3 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* <button
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
                )} */}
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-center space-x-2 rounded-lg border-indigo-500 bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500 hover:shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                <span>Reset password</span>
              </button>
              {/* <p className="text-center">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="inline-flex items-center space-x-1 font-medium text-indigo-600"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
