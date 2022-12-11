import express from "express";
import multer from "multer";
import fs from "fs";
import predictionService from "../services/prediction.service";

const router = express.Router();
const uploadPath = "./src/ml/predictionImages";
const upload = multer({ dest: uploadPath });

router.get("/", upload.single("image"), async (req, res, next) => {
  const imageFileName = req.file.filename;
  try {
    const predictionResult = await predictionService.runPrediction(
      imageFileName
    );

    fs.unlinkSync(`${uploadPath}/${imageFileName}`, (err) => {
      next(err);
    });

    res.status(200).json({
      success: true,
      message: "음식 추론",
      result: predictionResult,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
