import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { requireAuth } from "@clerk/express";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  requireAuth(),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No image provided" });
        return;
      }

      // نحول الصورة لـ base64 ونرفعها لـ Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "productify",
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

export default router;