import mongoose, { Document } from "mongoose";
export interface IProject extends Document {
    projectName: string;
    imageFile: string;
    githubLink: string;
    liveLink?: string;
    description: string;
    techs: string[];
    isLive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
declare const ProjectModel: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ProjectModel;
//# sourceMappingURL=ProjectModel.d.ts.map