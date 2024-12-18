import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { UploadButton } from "@/app/utils/uploadthing";
import { toast } from "react-hot-toast";
import { FileUp } from "lucide-react";

interface BusinessAddressSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  sameAddress: boolean;
  toggleSameAddress: () => void;
}

const BusinessAddressSection: React.FC<BusinessAddressSectionProps> = ({ 
  register, 
  setValue, 
  sameAddress, 
  toggleSameAddress 
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        3. Business Address
      </h2>
      <div className="flex flex-col gap-4">
        <input
          {...register("businessAddress.registeredAddress")}
          placeholder="Registered Address"
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          {...register("businessAddress.postalAddress")}
          placeholder="Postal Address"
          disabled={sameAddress}
          className={`w-full p-2 border rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            sameAddress ? "bg-gray-200" : ""
          }`}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={toggleSameAddress}
            className="mr-2"
          />
          <label className="text-gray-800">
            Postal Address is the Same as Registered Address
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label className="block mb-2 text-gray-800 text-center">
            Upload Proof of Address (Utility Bill)
          </label>
          <div className="w-full">
            <UploadButton
              className="w-full bg-gold-500 hover:bg-gold-600 text-white" // Full width for mobile
              endpoint="proofOfResidenceUploader"
              onClientUploadComplete={(res: any[]) => {
                if (res && res.length > 0) {
                  setValue("businessAddress.proofOfAddress", {
                    url: res[0].url,
                  });
                  setUploadedFileName(res[0].name); // Set the uploaded file name
                  toast.success("Proof of Residence uploaded successfully");
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload Error: ${error.message}`);
              }}
            />
          </div>
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

export default BusinessAddressSection;