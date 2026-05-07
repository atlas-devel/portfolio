import { Request, Response } from "express";
export declare const createProjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getProjects: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const singleProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ProjectController.d.ts.map