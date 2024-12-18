import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FinancialYearEndSectionProps {
  register: UseFormRegister<any>;
  months: string[];
}

const FinancialYearEndSection: React.FC<FinancialYearEndSectionProps> = ({ 
  register, 
  months 
}) => {
  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        5. Financial Year-End
      </h2>
      <select
        {...register("financialYearEnd")}
        className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="" className="text-gray-500">Select Month</option>
        {months.map((month) => (
          <option key={month} value={month} className="text-gray-800">
            {month}
          </option>
        ))}
      </select>
    </section>
  );
};

export default FinancialYearEndSection;