export interface PersonalInfo {
  fullName: string;
  idPassport: string;
  residentialAddress: string;
  contactNumber: string;
  emailAddress: string;
  nationality: string;
  idDocument: { url: string } | null;
}

export interface ProposedCompanyName {
  name: string;
}

export interface BusinessAddress {
  registeredAddress: string;
  postalAddress: string;
  proofOfAddress: { url: string } | null;
}

export interface Director {
  fullName: string;
  idPassport: string;
  residentialAddress: string;
  contactNumber: string;
  emailAddress: string;
}

export interface AdditionalDetails {
  hasEmployees: string;
  numberOfEmployees: string;
  wantsBBBEERegistration: string;
  wantBusinessAccount: string;
  selectedBank: string;
}

export interface Acknowledgement {
  name: string;
  date: string;
}

export interface CompanyRegistrationFormData {
  personalInfo: PersonalInfo;
  proposedCompanyNames: ProposedCompanyName[];
  businessAddress: BusinessAddress;
  directors: Director[];
  financialYearEnd: string;
  additionalDetails: AdditionalDetails;
  acknowledgement: Acknowledgement;
}