import { Request, Response } from "express";
import { certificateService } from "../services/CertificateService";

export const createCertificate = async (req: Request, res: Response) => {
  const { title, issuer, date, description, displayOrder } = req.body;
  try {
    const imageUrl = req.file ? req.file.path : "";
    const certificate = await certificateService.createCertificate({
      title,
      issuer,
      date,
      description,
      imageUrl,
      displayOrder,
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

export const updateCertificateOrder = async (req: Request, res: Response) => {
  try {
    const certificate = await certificateService.updateDisplayOrder(
      req.params.id as string,
      req.body?.displayOrder,
    );
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    return res.status(200).json({ success: true, certificate });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Could not update certificate order";
    return res.status(errorStatus(error)).json({ success: false, message });
  }
};

const errorStatus = (err: unknown) => err instanceof Error && err.message.startsWith("Validation") ? 400 : 500;
