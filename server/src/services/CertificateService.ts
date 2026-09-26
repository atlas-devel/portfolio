import { certificateRepository } from "../repositories/CertificateRepository";
import { ICertificate } from "../models/CertificateModel";
import { parseDisplayOrder } from "../utils/displayOrder";

export const certificateService = {
  async createCertificate(data: {
    title: string;
    issuer: string;
    date: string;
    description: string;
    imageUrl?: string;
    displayOrder?: string | number;
  }): Promise<ICertificate> {
    if (!data.title || !data.issuer || !data.date || !data.description) {
      throw new Error("Validation: all fields are required");
    }
    return await certificateRepository.create({ ...data, displayOrder: parseDisplayOrder(data.displayOrder) });
  },
  async getAllCertificates(): Promise<ICertificate[]> {
    return await certificateRepository.findAll();
  },
  async deleteCertificate(id: string): Promise<ICertificate | null> {
    if (!id) throw new Error("Validation: ID is required");
    return await certificateRepository.delete(id);
  },
  async updateDisplayOrder(id: string, order: unknown): Promise<ICertificate | null> {
    if (!id) throw new Error("Validation: ID is required");
    return certificateRepository.updateDisplayOrder(id, parseDisplayOrder(order));
  },
};
