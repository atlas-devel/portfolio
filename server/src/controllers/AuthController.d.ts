import { Request, Response } from "express";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const userData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const test: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=AuthController.d.ts.map