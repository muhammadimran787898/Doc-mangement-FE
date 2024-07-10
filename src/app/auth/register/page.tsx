"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Registerform {
  name: string;
  email: string;
  password: string;
  role: string;
}

const registerValoidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    ),
  role: yup.string().required("Role is required"),
});

export default function Register() {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Registerform>({
    resolver: yupResolver(registerValoidation),
  });

  const router = useRouter();

  // const { isPending, error, data, isSuccess, isLoading } = useQuery({
  //   queryKey: ["resData"],
  //   queryFn: () =>
  //     fetch("http://localhost:5000/api/v1/user/register").then((res) =>
  //       res.json(),
  //     ),
  // });

  // if (isLoading) {
  //   return <p>LoaderCircle...;</p>;
  // }
  // if (isSuccess) {
  //   toast.success("User registered successfully");
  //   setloading(false);
  //   router.push("/login");
  // }

  const onSubmit = async (data: any) => {
    console.log("working");
    setloading(true);
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/register", data)
        .then((response) => {
          console.log("Response:", response.data);
        });
      setloading(false);

      toast.success("User registered successfully");
      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div>
      <>
        <div className="flex h-screen flex-col justify-center bg-[url('/banner.jpg')] object-cover sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-12 w-auto"
              src="/logo2.png"
              alt="Workflow"
              width="100"
              height="100"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      type="name"
                      autoComplete="name"
                      className={` ${errors.name ? "border-red-500" : "border-gray-300"} block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm`}
                      {...register("name", {
                        required: "name is required",
                        maxLength: {
                          value: 30,
                          message: "Name cannot exceed 30 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

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
                      {...register("email")}
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      className={` ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      {...register("password", {
                        required: "password is required",
                        maxLength: {
                          value: 30,
                          message:
                            "Password ust contain special charceters alohabet and digt",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Registration Role
                  </label>
                  <div className="mt-1.5">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a rule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="doctor">doctor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* {errors.role && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.role.message}
                      </p>
                    )} */}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Register
                    <Loader
                      className={cn(
                        "absolute ml-16 flex h-4 w-4 justify-center bg-transparent hover:text-black",
                        {
                          "opacity-0": !loading,
                        },
                      )}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
