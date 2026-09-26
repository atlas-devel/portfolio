import { Router } from "express";
import { certificateUploads } from "../middleware/multer";
import { authenticateUser } from "../middleware/authMiddleware";
import { createCertificate, getCertificates, deleteCertificate, updateCertificateOrder } from "../controllers/CertificateController";

const router = Router();

router.post("/add", authenticateUser, certificateUploads.single("image"), createCertificate);
router.get("/all", getCertificates);
router.patch("/order/:id", authenticateUser, updateCertificateOrder);
router.delete("/delete/:id", authenticateUser, deleteCertificate);

export default router;
