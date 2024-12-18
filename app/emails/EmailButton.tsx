import { Html, Text, Section, Container, Heading, Hr, Img, Link } from "@react-email/components"
import * as React from "react";

// Helper function to determine file type and render appropriate content
const renderDocument = (url: string, documentType: string) => {
  if (!url) return null;

  const fileExtension = url.split('.').pop()?.toLowerCase();
  const isPDF = fileExtension === 'pdf' || url.includes('pdf');
  const isWord = 
    fileExtension === 'doc' || 
    fileExtension === 'docx' || 
    url.includes('msword') || 
    url.includes('openxmlformats-officedocument.wordprocessingml.document');
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension || '');

  return (
    <Section>
      <Text>{documentType}:</Text>
      {isImage ? (
        <Img src={url} alt={`${documentType} Document`} width="200" />
      ) : (
        <Link 
          href={url} 
          target="_blank" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'underline' 
          }}
        >
          {isPDF ? '📄 View PDF Document' : 
           isWord ? '📝 View Word Document' : 
           'View Document'}
        </Link>
      )}
    </Section>
  );
};

export default function Email(formData: any) {
  const { 
    personalInfo, 
    proposedCompanyNames, 
    businessAddress, 
    directors, 
    financialYearEnd, 
    additionalDetails,
    acknowledgement 
  } = formData;

  return (
    <Html>
      <Container>
        <Section>
          <Heading>Company Registration Submission Confirmation</Heading>
          <Hr />
        </Section>

        {/* 1. Personal Information */}
        <Section>
          <Heading>1. Personal Information</Heading>
          <Text>Full Name: {personalInfo.fullName}</Text>
          <Text>ID/Passport: {personalInfo.idPassport}</Text>
          <Text>Residential Address: {personalInfo.residentialAddress}</Text>
          <Text>Contact Number: {personalInfo.contactNumber}</Text>
          <Text>Email Address: {personalInfo.emailAddress}</Text>
          <Text>Nationality: {personalInfo.nationality}</Text>
          {personalInfo.idDocument?.url && 
            renderDocument(personalInfo.idDocument.url, 'ID Document')
          }
        </Section>

        {/* 2. Proposed Company Names */}
        <Section>
          <Heading>2. Proposed Company Names</Heading>
          {proposedCompanyNames.map((name: any, index: number) => (
            <Text key={index}>Company Name {index + 1}: {name.name}</Text>
          ))}
        </Section>

        {/* 3. Business Address */}
        <Section>
          <Heading>3. Business Address</Heading>
          <Text>Registered Address: {businessAddress.registeredAddress}</Text>
          <Text>Postal Address: {businessAddress.postalAddress}</Text>
          {businessAddress.proofOfAddress?.url && 
            renderDocument(businessAddress.proofOfAddress.url, 'Proof of Address')
          }
        </Section>

        {/* 4. Directors */}
        <Section>
          <Heading>4. Directors</Heading>
          {directors.map((director: any, index: number) => (
            <Section key={index}>
              <Text>Director {index + 1} Full Name: {director.fullName}</Text>
              <Text>ID/Passport: {director.idPassport}</Text>
              <Text>Contact Number: {director.contactNumber}</Text>
              <Text>Email Address: {director.emailAddress}</Text>
            </Section>
          ))}
        </Section>

        {/* 5. Financial Year-End */}
        <Section>
          <Heading>5. Financial Year-End</Heading>
          <Text>Month: {financialYearEnd}</Text>
        </Section>

        {/* 6. Additional Details */}
        <Section>
          <Heading>6. Additional Details</Heading>
          <Text>Has Employees: {additionalDetails.hasEmployees}</Text>
          {additionalDetails.hasEmployees === "yes" && additionalDetails.numberOfEmployees && (
            <Text>Number of Employees: {additionalDetails.numberOfEmployees}</Text>
          )}
          <Text>B-BBEE Registration: {additionalDetails.wantsBBBEERegistration}</Text>
          <Text>Business Account: {additionalDetails.wantBusinessAccount}</Text>
          {additionalDetails.wantBusinessAccount === "yes" && (
            <Text>Selected Bank: {additionalDetails.selectedBank}</Text>
          )}
        </Section>

        {/* Acknowledgement */}
        <Section>
          <Heading>Acknowledgement</Heading>
          <Text>Name: {acknowledgement.name}</Text>
          <Text>Date: {acknowledgement.date}</Text>
        </Section>
      </Container>
    </Html>
  );
}