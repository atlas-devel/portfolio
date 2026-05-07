import { certificateRepository } from "../repositories/CertificateRepository";
import { ICertificate } from "../models/CertificateModel";

export const certificateService = {
  async createCertificate(data: {
    title: string;
    issuer: string;
    date: string;
    description: string;
    imageUrl?: string;
  }): Promise<ICertificate> {
    if (!data.title || !data.issuer || !data.date || !data.description) {
      throw new Error("Validation: all fields are required");
    }
    return await certificateRepository.create(data);
  },
  async getAllCertificates(): Promise<ICertificate[]> {
    return await certificateRepository.findAll();
  },
  async deleteCertificate(id: string): Promise<ICertificate | null> {
    if (!id) throw new Error("Validation: ID is required");
    return await certificateRepository.delete(id);
  }
};
