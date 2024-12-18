export interface CompanyRegistrationFormData {
    personalInfo: {
      fullName: string;
      idPassport: string;
      residentialAddress: string;
      contactNumber: string;
      emailAddress: string;
      nationality: string;
      idDocument: { url: string } | null;
    };
    proposedCompanyNames: Array<{ name: string }>;
    businessAddress: {
      registeredAddress: string;
      postalAddress: string;
      proofOfAddress: { url: string } | null;
    };
    directors: Array<{
      fullName: string;
      idPassport: string;
      residentialAddress: string;
      contactNumber: string;
      emailAddress: string;
    }>;
    financialYearEnd: string;
    additionalDetails: {
      hasEmployees: string;
      numberOfEmployees?: string;
      wantsBBBEERegistration: string;
      wantBusinessAccount: string;
      selectedBank: string;
    };
    acknowledgement: {
      name: string;
      date: string;
    };
  }