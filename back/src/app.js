import express from "express";
import cors from "cors";
import sequelize from "./configs/sequelize";
import errorMiddleware from "./middlewares/error";

// 라우터 모듈
import authRouter from "./routers/auth.route";
import recipeSearch from "./routers/recipeSearch.route";

const app = express();

sequelize.sync({ sync: false });
// sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/recipe", recipeSearch);

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
