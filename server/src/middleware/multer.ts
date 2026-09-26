import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";
import { Request } from "express";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadTarget = "projects" | "certificates";

const createUpload = (target: UploadTarget) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (_req: Request, file: Express.Multer.File) => {
      const isImage = file.mimetype?.startsWith("image/");

      return {
        folder: target === "certificates" ? "portfolio-certificates" : "portfolio-projects",
        resource_type: "auto",
        allowed_formats:
          target === "certificates"
            ? ["jpg", "jpeg", "png", "gif", "webp", "pdf"]
            : ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: isImage
          ? [{ width: 1600, crop: "limit", quality: "auto", fetch_format: "auto" }]
          : undefined,
      };
    },
  });

  return multer({
    storage,
    fileFilter: (_req, file, cb) => {
      const isImage = file.mimetype?.startsWith("image/");
      const isPdf = file.mimetype === "application/pdf";

      if (target === "projects" && !isImage) {
        cb(new Error("Project uploads only accept image files"));
        return;
      }

      if (target === "certificates" && !isImage && !isPdf) {
        cb(new Error("Certificate uploads only accept images or PDF files"));
        return;
      }

      cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 },
  });
};

export const projectUploads = createUpload("projects");
export const certificateUploads = createUpload("certificates");
