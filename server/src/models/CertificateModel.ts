export interface ICertificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
  displayOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
