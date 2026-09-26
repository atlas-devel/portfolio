import prisma from "../config/prisma";
import { ICertificate } from "../models/CertificateModel";

const toCertificate = (
  certificate: Awaited<ReturnType<typeof prisma.certificate.findUnique>>,
): ICertificate | null =>
  certificate ? { ...certificate, _id: certificate.id } : null;

export const certificateRepository = {
  async findAll(): Promise<ICertificate[]> {
    const certificates = await prisma.certificate.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return certificates.map((certificate) => ({
      ...certificate,
      _id: certificate.id,
    }));
  },
  async findById(id: string): Promise<ICertificate | null> {
    return toCertificate(
      await prisma.certificate.findUnique({ where: { id } }),
    );
  },
  async create(data: Partial<ICertificate>): Promise<ICertificate> {
    const { _id, createdAt, updatedAt, ...certificateData } = data;
    const certificate = await prisma.certificate.create({
      data: {
        title: certificateData.title ?? "",
        issuer: certificateData.issuer ?? "",
        date: certificateData.date ?? "",
        description: certificateData.description ?? "",
        imageUrl: certificateData.imageUrl ?? "",
        displayOrder: certificateData.displayOrder ?? 1000,
      },
    });
    return { ...certificate, _id: certificate.id };
  },
  async delete(id: string): Promise<ICertificate | null> {
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    if (!certificate) return null;
    await prisma.certificate.delete({ where: { id } });
    return { ...certificate, _id: certificate.id };
  },

  async updateDisplayOrder(id: string, displayOrder: number): Promise<ICertificate | null> {
    const result = await prisma.certificate.updateMany({
      where: { id },
      data: { displayOrder },
    });
    if (!result.count) return null;
    return toCertificate(await prisma.certificate.findUnique({ where: { id } }));
  },
};
