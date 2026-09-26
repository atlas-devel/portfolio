export interface IVisitEvent {
  _id: string;
  dateKey: string;
  fingerprint: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
