import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const authorizeRefreshToken = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    next(ApiError.setBadRequest("리프레시 토큰을 전달받지 못함"));
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey);

    req.refreshToken = token;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(
        ApiError.setUnauthorized(
          "유효기간이 만료된 리프레시 토큰입니다. 유저를 로그인 화면으로 보내주세요"
        )
      );
    }
    if (err.name === "JsonWebTokenError") {
      next(
        ApiError.setBadRequest(
          "손상된 토큰입니다. 유저를 로그인 화면으로 보내주세요"
        )
      );
    }
    next(ApiError.setBadRequest("유효하지 않은 토큰입니다. 유저를 로그인 화면으로 보내주세요"));
  }
};

export default authorizeRefreshToken;
