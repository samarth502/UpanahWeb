// src/components/SignUp.js

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProfile } from "../store/Auth";
import { validateEmail, validateName, validatePassword, validateUserType, validateVendorFields } from "../Validations/Validations";
import userService from "../Services/UserServices";

export default function SignUp() {
  const navigate = useNavigate();
  const { resisterUser } = useProfile();
  const [userType, setUserType] = useState("");
  const [vendorSectionHeight, setVendorSectionHeight] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const vendorSectionRef = useRef(null);

  useEffect(() => {
    if (userType === "vendor") {
      setVendorSectionHeight(vendorSectionRef.current.scrollHeight);
    } else {
      setVendorSectionHeight(0);
    }
  }, [userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate fields
    const userTypeError = validateUserType(userType);
    const nameError = validateName(data.name);
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    let vendorErrors = {};

    if (userType === "vendor") {
      vendorErrors = validateVendorFields(data);
    }

    if (userTypeError || nameError || emailError || passwordError || Object.keys(vendorErrors).length > 0) {
      setSubmitError({
        userTypeError,
        nameError,
        emailError,
        passwordError,
        ...vendorErrors,
      });
      setSubmitting(false);
      return;
    }

    try {
      const userData = {
        ...data,
        addresses: [],
        phone: "",
        profilePic: "",
        DOB: "",
      };

     const signData =  await userService.createUser(userData)

     if(!signData){
      console.log("yahi error ha")
     }
     console.log("new data" , signData)

      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
    } catch (error) {
      setSubmitError({ general: error.message || "Failed to register user." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    if (submitError && e.target.value) {
      setSubmitError(null);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {submitSuccess && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> User registered successfully.</span>
            </div>
          )}

          {submitError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {Object.values(submitError).filter(Boolean).join(' ')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="flex justify-start text-sm font-medium leading-6 text-gray-900"
              >
                Name : <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="flex justify-start text-sm font-medium leading-6 text-gray-900"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-md  font-extrabold leading-6 text-gray-900">
                User Type <span className="text-red-500 ">*</span>
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="customer"
                    name="userType"
                    type="radio"
                    value="customer"
                    checked={userType === "customer"}
                    onChange={handleUserTypeChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="customer"
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Customer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="vendor"
                    name="userType"
                    type="radio"
                    value="vendor"
                    checked={userType === "vendor"}
                    onChange={handleUserTypeChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="vendor"
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vendor
                  </label>
                </div>
              </div>
            </div>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: vendorSectionHeight }}
              ref={vendorSectionRef}
            >
              {userType === "vendor" && (
                <div className="space-y-6 mt-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="vendorName"
                      className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                    >
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="vendorName"
                        name="vendorName"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="gstNumber"
                      className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                    >
                      GST Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="gstNumber"
                        name="gstNumber"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="flex justify-start text-sm font-medium leading-6 text-gray-900"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
