import { IAdmin } from "../models/AdminAuth";
export declare class AdminRepository {
    /**
     * Find an Admin by their email address
     */
    findByEmail(email: string): Promise<IAdmin | null>;
    /**
     * Find an Admin by their database ID
     */
    findById(id: string): Promise<IAdmin | null>;
}
//# sourceMappingURL=AdminRepository.d.ts.map