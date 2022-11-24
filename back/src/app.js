import express from "express";

import errorMiddleware from './middlewares/error';

const app = express();



app.get("/", (req, res) => {
  res.send("food-finder");
});

// multer 테스트 api
// app.post("/", userProfileImageUpload.single("image"), (req, res) => {
//   res.send(req.file);
// });

// 에러 처리 미들웨어
app.use(errorMiddleware);

export { app };
