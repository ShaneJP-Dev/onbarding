import React from "react";
import { UseFormRegister, Control, FieldArrayWithId, UseFieldArrayAppend } from "react-hook-form";
import { CompanyRegistrationFormData } from "@/app/constants/types";

interface DirectorsSectionProps {
  register: UseFormRegister<CompanyRegistrationFormData>;
  control: Control<CompanyRegistrationFormData>;
  directorFields: FieldArrayWithId<CompanyRegistrationFormData, "directors", "id">[];
  appendDirector: UseFieldArrayAppend<CompanyRegistrationFormData, "directors">;
}

const DirectorsSection: React.FC<DirectorsSectionProps> = ({ 
  register, 
  directorFields, 
  appendDirector 
}) => {
  const handleAppendDirector = () => {
    appendDirector({
      fullName: "",
      idPassport: "",
      residentialAddress: "",
      contactNumber: "",
      emailAddress: "",
    });
  };

  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Directors Information
        </h2>
        <button
          type="button"
          onClick={handleAppendDirector}
          className="bg-amber-300 text-gray-800 px-4 py-2 rounded hover:bg-amber-400"
        >
          Add Director
        </button>
      </div>
      {directorFields.map((field, index: number) => (
        <div
          key={field.id}
          className="flex flex-col gap-4 mb-4 border-b pb-4"
        >
          <input
            {...register(`directors.${index}.fullName` as const)}
            placeholder="Full Name"
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            {...register(`directors.${index}.idPassport` as const)}
            placeholder="ID/Passport"
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            {...register(`directors.${index}.residentialAddress` as const)}
            placeholder="Residential Address"
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            {...register(`directors.${index}.contactNumber` as const)}
            placeholder="Contact Number"
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            {...register(`directors.${index}.emailAddress` as const)}
            placeholder="Email"
            type="email"
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      ))}
    </section>
  );
};

export default DirectorsSection;