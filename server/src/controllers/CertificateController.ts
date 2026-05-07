import { Request, Response } from "express";
import { certificateService } from "../services/CertificateService";

export const createCertificate = async (req: Request, res: Response) => {
  const { title, issuer, date, description } = req.body;
  try {
    const imageUrl = req.file ? req.file.path : "";
    const certificate = await certificateService.createCertificate({
      title,
      issuer,
      date,
      description,
      imageUrl,
    });
    return res.status(201).json({ success: true, message: "Certificate added", certificate });
  } catch (err: any) {
    return res.status(errorStatus(err)).json({ success: false, message: err.message });
  }
};

export const getCertificates = async (_req: Request, res: Response) => {
  try {
    const certificates = await certificateService.getAllCertificates();
    return res.status(200).json({ success: true, certificates });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const certificate = await certificateService.deleteCertificate(id);
    if (!certificate) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err: any) {
    return res.status(errorStatus(err)).json({ success: false, message: err.message });
  }
};

const errorStatus = (err: any) => err.message.startsWith("Validation") ? 400 : 500;
