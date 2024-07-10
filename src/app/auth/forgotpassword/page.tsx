"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Resetpassword from "./reset";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { toast } from "sonner";

interface IForm {
  email: string;
}

const password = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required")
    .matches(/@[^.]*\./),
});
export default function Forgotpassword() {
  const [res, setRes] = useState<{
    message?: string;
    id?: string;
  }>({});
  const [status, setstatus] = useState();
  const [route, setroute] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(password),
  });

  const onSubmit = async (data: IForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/forgotpassword",
        data,
      );

      setstatus(response.data.message);
      toast.success("password reset link sent to your email");

      setroute(true);

      setRes(response.data);
    } catch (error: any) {
      setstatus(error.response.data.message);
      setroute(false);
    }
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      {route ? (
        <Resetpassword id={res.id} />
      ) : (
        <div className="w-5/12 rounded-xl bg-white p-8 shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">
            Enter Email for Reset Password
          </h1>
          <p className="text-slate-500">
            Fill up the form to reset the password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="my-10">
            <div className="flex flex-col space-y-5">
              <div>
                <label htmlFor="email">
                  <p className="pb-2 font-medium text-slate-700">
                    Email address
                  </p>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter email address"
                  className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
                {status && (
                  <p className="mt-2 text-sm text-red-600">{status}</p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500 hover:shadow"
              >
                <span>Send Email</span>
              </button>

              <p className="text-center">
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
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
