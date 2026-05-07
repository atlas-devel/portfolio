import { Router } from "express";
import { certificateUploads } from "../middleware/multer";
import { authenticateUser } from "../middleware/authMiddleware";
import { createCertificate, getCertificates, deleteCertificate } from "../controllers/CertificateController";

const router = Router();

router.post("/add", authenticateUser, certificateUploads.single("image"), createCertificate);
router.get("/all", getCertificates);
router.delete("/delete/:id", authenticateUser, deleteCertificate);

export default router;
