import express from "express";
import cors from "cors";
import sequelize from "./configs/sequelize";
import errorMiddleware from "./middlewares/error";

// 라우터 모듈
import authRouter from "./routers/auth.route";
import userRouter from "./routers/user.route";
import recipeSearchRouter from "./routers/recipeSearch.route";
import restaurantRouter from "./routers/restaurant.route";
import errorRouter from "./routers/error.route";

const app = express();

sequelize.sync({ sync: false });
// sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeSearchRouter);
app.use("/restaurant", restaurantRouter);
app.use("/error", errorRouter);

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
