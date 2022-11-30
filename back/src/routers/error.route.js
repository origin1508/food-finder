// 단순히 클라이언트에게 에러만 전달해주는 API
// 이외의 기능 없음

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).json({
    success: false,
    message: "에러",
  });
});

export default router;
