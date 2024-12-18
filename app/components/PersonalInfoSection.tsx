import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { UploadButton } from "@/app/utils/uploadthing";
import { toast } from "react-hot-toast";
import { CompanyRegistrationFormData } from "@/app/constants/types";
import { FileUp } from "lucide-react";

interface PersonalInfoSectionProps {
  register: UseFormRegister<CompanyRegistrationFormData>;
  setValue: UseFormSetValue<CompanyRegistrationFormData>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  register,
  setValue,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        1. Personal Information
      </h2>
      <div className="flex flex-col gap-4">
        <input
          {...register("personalInfo.fullName", { required: true })}
          placeholder="Full Name *"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          {...register("personalInfo.idPassport", { required: true })}
          placeholder="ID/Passport Number *"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          {...register("personalInfo.residentialAddress")}
          placeholder="Residential Address"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500"
        />
        <input
          {...register("personalInfo.contactNumber")}
          placeholder="Contact Number"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500"
        />
        <input
          {...register("personalInfo.emailAddress")}
          placeholder="Email Address"
          type="email"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500"
        />
        <input
          {...register("personalInfo.nationality")}
          placeholder="Nationality"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500"
        />
        <div className="flex flex-col items-center">
          <label className="block mb-2 text-gray-800 text-center">
            Upload Certified ID/Passport
          </label>
          <UploadButton
            className="bg-gold-500 hover:bg-gold-600 text-white w-full" // Full width for mobile
            endpoint="idDocumentUploader"
            onClientUploadComplete={(res: any[]) => {
              if (res && res.length > 0) {
                setValue("personalInfo.idDocument", {
                  url: res[0].url,
                });
                setUploadedFileName(res[0].name); // Assuming the response contains the file name
                toast.success("ID Document uploaded successfully");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload Error: ${error.message}`);
            }}
          />
          {uploadedFileName && (
            <div className="flex items-center mt-4 text-gray-700">
              <FileUp className="mr-2 text-amber-500" size={20} />
              <span className="text-sm">{uploadedFileName}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;