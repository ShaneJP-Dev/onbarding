import React from "react";
import { UseFormRegister } from "react-hook-form";

interface AcknowledgementSectionProps {
  register: UseFormRegister<any>;
}

const AcknowledgementSection: React.FC<AcknowledgementSectionProps> = ({ 
  register 
}) => {
  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Acknowledgement
      </h2>
      <div className="bg-white p-4 border rounded">
        <p className="mb-4 text-gray-800">
          I confirm that the information provided above is true and complete
          to the best of my knowledge.
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-gray-800">Name</label>
            <input
              {...register("acknowledgement.name")}
              placeholder="Your Full Name"
              className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-800">Date</label>
            <input
              {...register("acknowledgement.date")}
              type="date"
              className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcknowledgementSection;