"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Add, Bin, Remove } from "../../../assets/svg/index";
import { headers } from "next/headers";

interface IForm {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  experience: string;
  feepercounsultation: string;
  // timings: Date;
}

const applydoctor = yup.object().shape({
  fullname: yup.string().required("fullname is required"),
  email: yup.string().required("email is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("address is required"),
  specialization: yup.string().required("specialization is required"),
  experience: yup.string().required("experience is required"),
  feepercounsultation: yup.string().required("feepercounsultation is required"),
  // timings: yup.date().required("timings is required"),
});
function Applydocter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(applydoctor),
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [timings, setTimings] = useState<any>([
    { day: "Monday", start: "", end: "", closed: false },
  ]);

  const handleAddTiming = () => {
    setTimings([...timings, { day: "", start: "", end: "", closed: false }]);
  };

  const handleRemoveTiming = (index: any) => {
    const newTimings = timings.filter((_: any, i: any) => i !== index);
    setTimings(newTimings);
  };

  const handleChange = (index: any, field: any, value: any) => {
    const newTimings = [...timings];
    newTimings[index][field] = value;
    if (field === "closed" && value === true) {
      newTimings[index].start = "";
      newTimings[index].end = "";
    }
    setTimings(newTimings);
  };

  const getFormattedTimings = () => {
    return timings.map((timing: any) => {
      if (timing.closed) {
        return `${timing.day}: Closed`;
      } else {
        return `${timing.day}: ${timing.start}-${timing.end}`;
      }
    });
  };
  console.log(timings);

  const onSubmit = async (data: IForm) => {
    console.log(data, "data");
    const sendingadata = { ...data, timings };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/applydoctor",
        sendingadata,
        {
          headers: {
            token: localStorage.getItem("authToken"),
            "Content-Type": "application/json",
          },
        },
      );

      const responseData = response.data;
      toast.success(responseData.message);
      console.log(responseData);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      <div className="mx-3 flex justify-start">
        <p className="text-2xl font-semibold text-slate-800">Apply Doctor</p>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 gap-4 rounded-xl">
        <div className="mx-3 w-auto bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 grid grid-cols-3 gap-4">
              <div className="mb-1">
                <label
                  htmlFor="fullname"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  FullName
                </label>
                <input
                  type="text"
                  {...register("fullname", {
                    required: "Full name is required",
                  })}
                  className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Name"
                />
                {errors.fullname && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  htmlFor="address"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  {...register("address", { required: "Address is required" })}
                  className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-2">
              <p className="text-2xl font-semibold text-slate-800">
                Personal Information
              </p>
              <div className="my-4" />
            </div>
            <div className="grid grid-cols-1 gap-4 rounded-xl">
              <div className="mb-1 grid grid-cols-3 gap-4">
                <div className="w-full">
                  <div className="mb-1">
                    <label
                      htmlFor="specialization"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Specilization
                    </label>
                    <input
                      type="text"
                      placeholder="Specilization"
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                      className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                        errors.specialization
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.specialization && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.specialization.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-1">
                    <label
                      htmlFor="experience"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      placeholder="Experience"
                      {...register("experience", {
                        required: "Experience is required",
                      })}
                      className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                        errors.experience ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.experience && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-1">
                    <label
                      htmlFor="feepercounsultation"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      FeePerCunsultation
                    </label>
                    <input
                      type="text"
                      placeholder="FeePerCunsultation"
                      {...register("feepercounsultation", {
                        required: "Fee per consultation is required",
                      })}
                      className={`block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm ${
                        errors.feepercounsultation
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.feepercounsultation && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.feepercounsultation.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="feepercounsultation"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Select Days and Timings
                  </label>

                  <p className="mb-2">Timings: {getFormattedTimings()}</p>
                  <p>{timings.day} </p>

                  {timings.map((timing: any, index: any) => (
                    <div key={index} className="mb-2 flex space-x-2">
                      <select
                        value={timing.day}
                        onChange={(e) =>
                          handleChange(index, "day", e.target.value)
                        }
                        className="block w-full appearance-none rounded-md border px-3 py-2"
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <input
                        type="time"
                        value={timing.start}
                        onChange={(e) =>
                          handleChange(index, "start", e.target.value)
                        }
                        disabled={timing.closed}
                        className="block w-full appearance-none rounded-md border px-3 py-2"
                      />
                      <input
                        type="time"
                        value={timing.end}
                        onChange={(e) =>
                          handleChange(index, "end", e.target.value)
                        }
                        disabled={timing.closed}
                        className="block w-full appearance-none rounded-md border px-1 py-2"
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={timing.closed}
                          className="block appearance-none rounded-md px-1 py-2"
                          onChange={(e) =>
                            handleChange(index, "closed", e.target.checked)
                          }
                        />{" "}
                        <Remove />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveTiming(index)}
                        className="mt-1"
                        disabled={timings.length === 1 ? true : false}
                      >
                        <Bin className="mr-2 !h-5 !w-5" />
                      </button>
                      <button
                        className="mt-1"
                        type="button"
                        onClick={handleAddTiming}
                      >
                        <Add />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto flex w-2/4 justify-center">
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] px-8 py-3 text-center text-base font-semibold text-white outline-none"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Applydocter;
