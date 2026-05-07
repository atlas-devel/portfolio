import CertificateModel, { ICertificate } from "../models/CertificateModel";

export const certificateRepository = {
  async findAll(): Promise<ICertificate[]> {
    return await CertificateModel.find().sort({ createdAt: -1 });
  },
  async findById(id: string): Promise<ICertificate | null> {
    return await CertificateModel.findById(id);
  },
  async create(data: Partial<ICertificate>): Promise<ICertificate> {
    return await CertificateModel.create(data);
  },
  async delete(id: string): Promise<ICertificate | null> {
    return await CertificateModel.findByIdAndDelete(id);
  }
};
