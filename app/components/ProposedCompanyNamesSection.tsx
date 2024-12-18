import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CompanyRegistrationFormData } from "@/app/constants/types";

interface ProposedCompanyNamesSectionProps {
  register: UseFormRegister<CompanyRegistrationFormData>;
  watch: UseFormWatch<CompanyRegistrationFormData>;
}

const ProposedCompanyNamesSection: React.FC<ProposedCompanyNamesSectionProps> = ({ 
  register, 
  watch 
}) => {
  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        2. Proposed Company Names
      </h2>
      <div className="flex flex-col gap-4">
        {watch("proposedCompanyNames").map((_, index: number) => (
          <input
            key={index}
            {...register(`proposedCompanyNames.${index}.name` as const)}
            placeholder={`Company Name ${index + 1}${index === 0 ? " (Desired Name)" : ""}`}
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        ))}
      </div>
    </section>
  );
};

export default ProposedCompanyNamesSection;