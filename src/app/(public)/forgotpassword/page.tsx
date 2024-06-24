"use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
// import { Toast } from "@/components/ui/toast";
// import Resetpassword from "./reset";

// interface iform {
//   email: string;
// }

// export default function Forgotpasswrd() {
//   const [res, setRes] = useState<any>("");
//   const [status, setstatus] = useState(false);
//   console.log("res", res);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<iform>();

//   const onSubmit = (data: any) => {
//     try {
//       const sendData = async () => {
//         await axios
//           .post("http://localhost:5000/api/v1/auth/forgotpassword", data)
//           .then((res) => {
//             console.log(res.data, "data");
//             setRes(res.data);
//           })
//           .catch((err) => {
//             console.log(err.response.data.message);
//           });
//       };

//       sendData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container flex min-h-screen items-center justify-center">
//       {res.success === false ? (
//         <Resetpassword email={res?.email} />
//       ) : (
//         <div className="w-5/12 rounded-xl bg-white p-8 shadow shadow-slate-300">
//           <h1 className="text-4xl font-medium">
//             Enter Email for Reset password
//           </h1>
//           <p className="text-slate-500">
//             Fill up the form to reset the password
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="my-10">
//             <div className="flex flex-col space-y-5">
//               <div>
//                 <label htmlFor="email">
//                   <p className="pb-2 font-medium text-slate-700">
//                     Email address
//                   </p>
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   {...register("email", { required: "email is required" })}
//                   placeholder="Enter email address"
//                   className={` ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   } block w-full appearance-none rounded-md border px-3 py-3 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm`}
//                 />
//                 {errors.email && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors.email.message}
//                   </p>
//                 )}

//                 {res && (
//                   <p className="mt-2 text-sm text-red-600">{res?.message}</p>
//                 )}
//               </div>
//               <button className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-indigo-500 bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500 hover:shadow">
//                 <span>Send Email</span>
//               </button>
//               <p className="text-center">
//                 Not registered yet?{" "}
//                 <Link
//                   href="/register"
//                   className="inline-flex items-center space-x-1 font-medium text-indigo-600"
//                 >
//                   <span>Register now </span>
//                   <span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       stroke-width="2"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                       />
//                     </svg>
//                   </span>
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link"; // Assuming you're using Next.js for routing
import Resetpassword from "./reset";

interface IForm {
  email: string;
}

// Function component definition
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
  } = useForm<IForm>();

  const onSubmit = async (data: IForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgotpassword",
        data,
      );
      setstatus(response.data.message);
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
