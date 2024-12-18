"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { UploadButton } from "@/app/utils/uploadthing";
import { CompanyRegistrationFormData } from "./constants/types";
import { useRouter } from "next/navigation";
import PersonalInfoSection from "./components/PersonalInfoSection";
import ProposedCompanyNamesSection from "./components/ProposedCompanyNamesSection";
import BusinessAddressSection from "./components/BusinessAddressSection";
import DirectorsSection from "./components/DirectorsSection";
import FinancialYearEndSection from "./components/FinancialYearEndSection";
import AdditionalDetailsSection from "./components/AdditionalDetailsSection";
import AcknowledgementSection from "./components/AcknowledgementSection";

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
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
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
        router.push("/thank-you");
      } else {
        toast.error("Failed to submit form or send email");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Blurred background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30" 
        style={{ 
          backgroundImage: "url('/api/placeholder/1920/1080')" 
        }}
      ></div>

      <div className="relative container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 bg-white/80 rounded-lg shadow-lg">
        <Toaster position="top-right" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Company Registration Form
          </h1>

          <PersonalInfoSection 
            register={register} 
            setValue={setValue} 
          />

          <ProposedCompanyNamesSection 
            register={register} 
            watch={watch} 
          />

          <BusinessAddressSection 
            register={register} 
            setValue={setValue} 
            sameAddress={sameAddress} 
            toggleSameAddress={toggleSameAddress} 
          />

          <DirectorsSection 
            register={register} 
            control={control} 
            directorFields={directorFields} 
            appendDirector={appendDirector} 
          />

          <FinancialYearEndSection 
            register={register} 
            months={months} 
          />

          <AdditionalDetailsSection 
            register={register} 
            watch={watch} 
            banks={banks} 
          />

          <AcknowledgementSection 
            register={register} 
          />

          <button
            type="submit"
            className="w-full py-3 bg-amber-300 text-gray-800 font-semibold rounded-lg hover:bg-amber-400 transition duration-300 ease-in-out"
          >
            Submit Company Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;