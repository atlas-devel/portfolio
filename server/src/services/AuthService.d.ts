import { IAdmin } from "../models/AdminAuth";
export declare class AuthService {
    private adminRepo;
    login(email?: string, password?: string): Promise<{
        admin: IAdmin;
        token: string;
    }>;
    getUserData(userId: string): Promise<IAdmin>;
}
//# sourceMappingURL=AuthService.d.ts.map