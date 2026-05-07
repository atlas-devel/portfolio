import mongoose, { Document } from "mongoose";
export interface IAdmin extends Document {
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}
declare const AdminModel: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default AdminModel;
//# sourceMappingURL=AdminAuth.d.ts.map