import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface AdditionalDetailsSectionProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  banks: string[];
}

const AdditionalDetailsSection: React.FC<AdditionalDetailsSectionProps> = ({ 
  register, 
  watch, 
  banks 
}) => {
  const wantBusinessAccount = watch("additionalDetails.wantBusinessAccount");
  const hasEmployees = watch("additionalDetails.hasEmployees");

  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        6. Additional Details
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-2 text-gray-800">
            Does the business have employees?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-800">
              <input
                {...register("additionalDetails.hasEmployees")}
                type="radio"
                value="yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center text-gray-800">
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

        {hasEmployees === "yes" && (
          <div>
            <label className="block mb-2 text-gray-800">
              Number of Employees
            </label>
            <input
              {...register("additionalDetails.numberOfEmployees")}
              type="number"
              min="1"
              placeholder="Enter number of employees"
              className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        <div>
          <label className="block mb-2 text-gray-800">
            Want B-BBEE Registration?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-800">
              <input
                {...register("additionalDetails.wantsBBBEERegistration")}
                type="radio"
                value="yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center text-gray-800">
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

        <div>
          <label className="block mb-2 text-gray-800">
            Would you like to open a business account?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-800">
              <input
                {...register("additionalDetails.wantBusinessAccount")}
                type="radio"
                value="yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center text-gray-800">
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

        {wantBusinessAccount === "yes" && (
          <div>
            <label className="block mb-2 text-gray-800">Select Bank</label>
            <select
              {...register("additionalDetails.selectedBank")}
              className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" className="text-gray-500">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank} className="text-gray-800">
                  {bank}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdditionalDetailsSection;