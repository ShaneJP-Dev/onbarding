"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { UploadButton } from "@/app/utils/uploadthing";
import { CompanyRegistrationFormData } from "./constants/types";
import { useRouter } from "next/navigation";

interface UploadResult {
  url: string;
  name: string;
  size: number;
  // Add other properties as needed
}

const CompanyRegistrationForm = () => {
  const router = useRouter();

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      personalInfo: {
        fullName: "",
        idPassport: "",
        residentialAddress: "",
        contactNumber: "",
        emailAddress: "",
        nationality: "",
        idDocument: null as { url: string } | null,
      },
      proposedCompanyNames: [
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
      ],
      businessAddress: {
        registeredAddress: "",
        postalAddress: "",
        proofOfAddress: null as { url: string } | null,
      },
      directors: [
        {
          fullName: "",
          idPassport: "",
          residentialAddress: "",
          contactNumber: "",
          emailAddress: "",
        },
      ],
      financialYearEnd: "",
      additionalDetails: {
        hasEmployees: "",
        numberOfEmployees: "",
        wantsBBBEERegistration: "",
        wantBusinessAccount: "",
        selectedBank: "",
      },
      acknowledgement: {
        name: "",
        date: "",
      },
    },
  });

  const { fields: directorFields, append: appendDirector } = useFieldArray({
    control,
    name: "directors",
  });

  const [sameAddress, setSameAddress] = useState(false);

  const toggleSameAddress = () => {
    setSameAddress(!sameAddress);
    if (!sameAddress) {
      setValue(
        "businessAddress.postalAddress",
        watch("businessAddress.registeredAddress")
      );
    } else {
      setValue("businessAddress.postalAddress", "");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const banks = ["Absa", "FNB", "Capitec", "Nedbank", "Standard Bank"];

  const onSubmit = async (data: CompanyRegistrationFormData) => {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Form submitted and email sent successfully!");
        // Redirect to thank you page
        router.push("/thank-you");
      } else {
        toast.error("Failed to submit form or send email");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred");
    }
  };

  const wantBusinessAccount = watch("additionalDetails.wantBusinessAccount");
  const hasEmployees = watch("additionalDetails.hasEmployees");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Company Registration Form
        </h1>
        {/* Personal Information Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            1. Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              {...register("personalInfo.fullName", { required: true })}
              placeholder="Full Name *"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("personalInfo.idPassport", { required: true })}
              placeholder="ID/Passport Number *"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("personalInfo.residentialAddress")}
              placeholder="Residential Address"
              className="w-full p-2 border rounded text-black placeholder-black"
            />
            <input
              {...register("personalInfo.contactNumber")}
              placeholder="Contact Number"
              className="w-full p-2 border rounded text-black placeholder-black"
            />
            <input
              {...register("personalInfo.emailAddress")}
              placeholder="Email Address"
              type="email"
              className="w-full p-2 border rounded text-black placeholder-black"
            />
            <input
              {...register("personalInfo.nationality")}
              placeholder="Nationality"
              className="w-full p-2 border rounded text-black placeholder-black"
            />
            <div className="col-span-2">
              <label className="block mb-2 text-black">
                Upload Certified ID/Passport
              </label>
              <div className="flex items-center text-black ">
                {/* For ID Document */}
                <UploadButton
                  endpoint="idDocumentUploader"
                  onClientUploadComplete={(res: UploadResult[]) => {
                    // Safely access the first uploaded file's URL
                    if (res && res.length > 0) {
                      setValue("personalInfo.idDocument", {
                        url: res[0].url,
                      });
                      toast.success("ID Document uploaded successfully");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload Error: ${error.message}`);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Proposed Company Names Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            2. Proposed Company Names
          </h2>
          <div className="grid gap-4">
            {watch("proposedCompanyNames").map((_, index) => (
              <input
                key={index}
                {...register(`proposedCompanyNames.${index}.name` as const)}
                placeholder={`Company Name ${index + 1}${
                  index === 0 ? " (Desired Name)" : ""
                }`}
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </section>

        {/* Business Address Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            3. Business Address
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register("businessAddress.registeredAddress")}
              placeholder="Registered Address"
              className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("businessAddress.postalAddress")}
              placeholder="Postal Address"
              disabled={sameAddress}
              className={`w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                sameAddress ? "bg-gray-200" : ""
              }`}
            />
            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={toggleSameAddress}
                className="mr-2"
              />
              <label className="text-black">
                Postal Address is the Same as Registered Address
              </label>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-black">
                Upload Proof of Address (Utility Bill)
              </label>
              <div className="flex items-center">
                {/* For Proof of Residence */}
                <UploadButton
                  endpoint="proofOfResidenceUploader"
                  onClientUploadComplete={(res: UploadResult[]) => {
                    if (res && res.length > 0) {
                      setValue("businessAddress.proofOfAddress", {
                        url: res[0].url,
                      });
                      toast.success("Proof of Residence uploaded successfully");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload Error: ${error.message}`);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Directors Information Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">
              4. Directors Information
            </h2>
            <button
              type="button"
              onClick={() => appendDirector({})}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Director
            </button>
          </div>
          {directorFields.map((field, index) => (
            <div
              key={field.id}
              className="grid md:grid-cols-2 gap-4 mb-4 border-b pb-4"
            >
              <input
                {...register(`directors.${index}.fullName`)}
                placeholder="Full Name"
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register(`directors.${index}.idPassport`)}
                placeholder="ID/Passport"
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register(`directors.${index}.residentialAddress`)}
                placeholder="Residential Address"
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register(`directors.${index}.contactNumber`)}
                placeholder="Contact Number"
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register(`directors.${index}.emailAddress`)}
                placeholder="Email"
                type="email"
                className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </section>

        {/* Financial Year-End Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            5. Financial Year-End
          </h2>
          <select
            {...register("financialYearEnd")}
            className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </section>

        {/* Additional Details Section - Updated */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            6. Additional Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-black">
                Does the business have employees?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.hasEmployees")}
                    type="radio"
                    value="yes"
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.hasEmployees")}
                    type="radio"
                    value="no"
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Conditional input for number of employees */}
            {watch("additionalDetails.hasEmployees") === "yes" && (
              <div>
                <label className="block mb-2 text-black">
                  Number of Employees
                </label>
                <input
                  {...register("additionalDetails.numberOfEmployees")}
                  type="number"
                  min="1"
                  placeholder="Enter number of employees"
                  className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block mb-2 text-black">
                Want B-BBEE Registration?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.wantsBBBEERegistration")}
                    type="radio"
                    value="yes"
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.wantsBBBEERegistration")}
                    type="radio"
                    value="no"
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* New Business Account Section */}
            <div>
              <label className="block mb-2 text-black">
                Would you like to open a business account?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.wantBusinessAccount")}
                    type="radio"
                    value="yes"
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center text-black">
                  <input
                    {...register("additionalDetails.wantBusinessAccount")}
                    type="radio"
                    value="no"
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Conditional Bank Dropdown */}
            {wantBusinessAccount === "yes" && (
              <div>
                <label className="block mb-2 text-black">Select Bank</label>
                <select
                  {...register("additionalDetails.selectedBank")}
                  className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>

        {/* Acknowledgement Section */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Acknowledgement
          </h2>
          <div className="bg-white p-4 border rounded">
            <p className="mb-4 text-black">
              I confirm that the information provided above is true and complete
              to the best of my knowledge.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-black">Name</label>
                <input
                  {...register("acknowledgement.name")}
                  placeholder="Your Full Name"
                  className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-black">Date</label>
                <input
                  {...register("acknowledgement.date")}
                  type="date"
                  className="w-full p-2 border rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={async () => {
            await fetch("/api/emails", { method: "POST" });
          }}
          className="text-white
           border-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompanyRegistrationForm;
