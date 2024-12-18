import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Mock auth function
const auth = async (req: Request) => {
  // Replace this with your actual authentication logic
  return { id: "fakeId" };
};

export const ourFileRouter = {
  // File route for ID document uploads (multiple document types)
  idDocumentUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "application/msword": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "16MB", 
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("ID Document upload complete for userId:", metadata.userId);
      console.log("File uploaded:", file);
      return { 
        uploadedBy: metadata.userId,
        fileType: file.type,
        fileUrl: file.url 
      };
    }),

  // File route for proof of residence uploads (multiple document types)
  proofOfResidenceUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "application/msword": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "16MB", 
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Proof of Residence upload complete for userId:", metadata.userId);
      console.log("File uploaded:", file);
      return { 
        uploadedBy: metadata.userId,
        fileType: file.type,
        fileUrl: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;