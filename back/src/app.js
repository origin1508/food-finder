import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("food-finder");
});

// multer 테스트 api
// app.post("/", userProfileImageUpload.single("image"), (req, res) => {
//   res.send(req.file);
// });

export { app };
